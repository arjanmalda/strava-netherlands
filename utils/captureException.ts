import { captureException as sentryCaptureException } from '@sentry/nextjs';
import { CaptureContext } from '@sentry/types/types/scope';

export function captureException(error: unknown, captureContext?: CaptureContext) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error, captureContext);
  }

  sentryCaptureException(error, captureContext);
}
