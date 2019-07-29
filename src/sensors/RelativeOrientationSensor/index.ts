// Sensors
import { FusionPoseSensor } from './FusionPoseSensor';
import { Quaternion, Vector3 } from './math';
import { getOrientation } from './utilities';

// Types
import { TNullable } from '../../types';

const SENSOR_FREQUENCY = 60;

const Z_AXIS = new Vector3(0, 0, 1);

/**
 * Polyfill for RelativeOrientationSensor of the Generic Sensor API
 *
 * See: https://smus.com/sensor-fusion-prediction-webvr/
 */
class RelativeOrientationSensor {
  public errors: any[] = [];

  private sensor: any;
  private fallbackSensor: TNullable<FusionPoseSensor> = null;
  private kalmanFilterWeight: number;
  private predictionTime: number;
  private sensorQuaternion: Quaternion = new Quaternion();
  private worldToScreenQuaternion: Quaternion = new Quaternion();
  private outputArray: Float32Array = new Float32Array(4);
  private outputQuaternion: Quaternion = new Quaternion();

  constructor(kalmanFilterWeight: number = 0.98, predictionTime: number = 0.04) {
    this.kalmanFilterWeight = kalmanFilterWeight;
    this.predictionTime = predictionTime;
  }

  public on(frequency: number = SENSOR_FREQUENCY): void {
    let sensor = null;

    try {
      if (navigator.permissions) {
        Promise.all([
          navigator.permissions.query({ name: 'accelerometer' }),
          navigator.permissions.query({ name: 'magnetometer' }),
          navigator.permissions.query({ name: 'gyroscope' }),
        ]).then(permissionStatuses => {
          if (permissionStatuses.every(permissionStatus => permissionStatus.state === 'granted')) {
            sensor = new (window as any).RelativeOrientationSensor({ frequency });
            sensor.addEventListener('error', this.onSensorErrorHandler, false);
          } else {
            console.warn('Required sensor access is not granted or available');
          }
        });
      } else {
        sensor = new (window as any).RelativeOrientationSensor({ frequency });
        sensor.addEventListener('error', this.onSensorErrorHandler, false);
      }
    } catch (error) {
      this.errors.push(error);

      if (error.name === 'SecurityError') {
        console.error('Cannot construct sensors due to the Feature Policy');
        console.warn(
          'Attempting to fall back using "devicemotion"; however this will fail in the future without correct permissions.'
        );
      } else if (error.name === 'ReferenceError') {
        // Fall back to the devicemotion API
        this.useFallbackSensor();
      } else {
        console.error(error);
      }
    }

    if (sensor) {
      this.sensor = sensor;
      this.sensor.addEventListener('reading', this.onSensorReadHandler, false);
      this.sensor.start();
    }

    window.addEventListener('orientationchange', this.onOrientationChangeHandler, false);
  }

  public off(): void {
    if (this.sensor) {
      this.sensor.stop();
      this.sensor.removeEventListener('reading', this.onSensorReadHandler, false);
      this.sensor.removeEventListener('error', this.onSensorErrorHandler, false);
      this.sensor = null;
    }

    if (this.fallbackSensor) {
      this.fallbackSensor.stop();
    }

    window.removeEventListener('orientationchange', this.onOrientationChangeHandler, false);
  }

  public getOrientation(): Float32Array {
    if (this.fallbackSensor) {
      return this.fallbackSensor.getOrientation();
    }

    if (!this.sensor || !this.sensor.quaternion) {
      this.outputArray[0] = 0;
      this.outputArray[1] = 0;
      this.outputArray[2] = 0;
      this.outputArray[3] = 1;

      return this.outputArray;
    }

    const tmpQuaternion = this.sensor.quaternion;
    this.sensorQuaternion.set(
      tmpQuaternion[0],
      tmpQuaternion[1],
      tmpQuaternion[2],
      tmpQuaternion[3]
    );

    const outputQuaternion = this.outputQuaternion;

    // TODO: add VR support?
    // https://github.com/immersive-web/cardboard-vr-display/blob/b2fd5b03fa579fecead1b3842782d7640e8ae61f/src/pose-sensor.js#L149-L166

    outputQuaternion.multiply(this.sensorQuaternion);
    outputQuaternion.multiply(this.worldToScreenQuaternion);

    this.outputArray[0] = outputQuaternion.x;
    this.outputArray[1] = outputQuaternion.y;
    this.outputArray[2] = outputQuaternion.z;
    this.outputArray[3] = outputQuaternion.w;

    return this.outputArray;
  }

  private onSensorErrorHandler(event: any): void {
    this.errors.push(event.error);

    if (event.error.name === 'NotAllowedError') {
      console.error('Permission to access sensor was denied');
    } else if (event.error.name === 'NotReadableError') {
      console.error('Sensor could not be read');
    } else {
      console.error(event.error);
    }

    this.useFallbackSensor();
  }

  // tslint:disable-next-line:no-empty
  private onSensorReadHandler(event: any): void {}

  private onOrientationChangeHandler(): void {
    const angle = (-getOrientation().angle * Math.PI) / 180;
    this.worldToScreenQuaternion.setFromAxisAngle(Z_AXIS, angle);
  }

  private useFallbackSensor(): void {
    this.fallbackSensor = new FusionPoseSensor(this.kalmanFilterWeight, this.predictionTime);

    if (this.sensor) {
      this.sensor.removeEventListener('reading', this.onSensorReadHandler);
      this.sensor.removeEventListener('error', this.onSensorErrorHandler);
      this.sensor = null;
    }
  }
}

export const relativeOrientationSensor = new RelativeOrientationSensor();