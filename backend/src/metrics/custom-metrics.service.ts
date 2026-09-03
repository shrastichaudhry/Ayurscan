import { Injectable } from '@nestjs/common';

import {
  Counter,
  Histogram,
  register,
} from 'prom-client';

@Injectable()
export class CustomMetricsService {

  // ==============================
  // Total Predictions
  // ==============================
  readonly predictionCounter: Counter<string>;

  // ==============================
  // Successful Predictions
  // ==============================
  readonly predictionSuccessCounter: Counter<string>;

  // ==============================
  // Failed Predictions
  // ==============================
  readonly predictionFailureCounter: Counter<string>;

  // ==============================
  // Prediction Duration
  // ==============================
  readonly predictionDuration: Histogram<string>;

  constructor() {
    console.log('✅ CustomMetricsService initialized');

    // Total predictions
    this.predictionCounter = new Counter({
      name: 'ayurscan_predictions_total',
      help: 'Total number of predictions',
      registers: [register],
    });

    // Successful predictions
    this.predictionSuccessCounter = new Counter({
      name: 'ayurscan_prediction_success_total',
      help: 'Total number of successful predictions',
      registers: [register],
    });

    // Failed predictions
    this.predictionFailureCounter = new Counter({
      name: 'ayurscan_prediction_failure_total',
      help: 'Total number of failed predictions',
      registers: [register],
    });

    // Prediction duration
    this.predictionDuration = new Histogram({
      name: 'ayurscan_prediction_duration_seconds',
      help: 'Prediction execution time',
      labelNames: ['endpoint'],
      buckets: [0.1, 0.3, 0.5, 1, 2, 5],
      registers: [register],
    });
  }

  // ==============================
  // Total prediction
  // ==============================
  incrementPredictions() {
    console.log('📊 Total prediction metric increment');
    this.predictionCounter.inc();
  }

  // ==============================
  // Successful prediction
  // ==============================
  incrementPredictionSuccess() {
    console.log('✅ Prediction success metric increment');
    this.predictionSuccessCounter.inc();
  }

  // ==============================
  // Failed prediction
  // ==============================
  incrementPredictionFailure() {
    console.log('❌ Prediction failure metric increment');
    this.predictionFailureCounter.inc();
  }

  // ==============================
  // Prediction timer
  // ==============================
  startPredictionTimer() {
    return this.predictionDuration.startTimer();
  }
}