'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const STUDY_PROJECT_ACK_STORAGE_KEY = 'url-shortener-study-project-ack';

export function hasStudyDisclaimerAcknowledged(): boolean {
  try {
    return localStorage.getItem(STUDY_PROJECT_ACK_STORAGE_KEY) === '1';
  } catch {
    return true;
  }
}

export function acknowledgeStudyDisclaimer(): void {
  try {
    localStorage.setItem(STUDY_PROJECT_ACK_STORAGE_KEY, '1');
  } catch {
    /* ignore private mode / quota */
  }
}

type StudyProjectDisclaimerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
  onDismissWithoutContinue: () => void;
};

export function StudyProjectDisclaimerDialog({
  open,
  onOpenChange,
  onContinue,
  onDismissWithoutContinue,
}: StudyProjectDisclaimerDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Before you shorten a link</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3 text-left">
              <p>
                This URL shortener is a <strong className="text-foreground">study project</strong>.
                It is not intended for production or critical use.
              </p>
              <p>
                <strong className="text-foreground">Data may be deleted at any time</strong> (for
                example during experiments, resets, or cleanup). Do not rely on links staying valid
                long term.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
          <AlertDialogAction
            type="button"
            className="w-full"
            onClick={() => {
              acknowledgeStudyDisclaimer();
              onContinue();
            }}
          >
            I understand — continue
          </AlertDialogAction>
          <AlertDialogCancel
            type="button"
            className="w-full"
            onClick={() => {
              onDismissWithoutContinue();
            }}
          >
            Not now
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
