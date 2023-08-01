import React, { ReactNode } from "react";

import Close from "@mui/icons-material/Close";

import {
  Box,
  Breakpoint,
  ButtonProps,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogProps as MuiDialogProps,
  DialogTitle,
  IconButton,
} from "@mui/material";
import Button from "../Button";

export const testIds = {
  cancel: "dialog-cancel",
  submit: "dialog-submit",
};

export interface DialogProps {
  open: boolean;
  children: React.ReactNode;
  onSubmit?: () => void;
  onClose: React.MouseEventHandler;
  onCancel?: React.MouseEventHandler;
  submitTitle?: string;
  submitDisabled?: boolean;
  title?: string | ReactNode;
  sx?: MuiDialogProps["sx"];
  cancelTitle?: string;
  maxWidth?: Breakpoint | false;
  withoutButtons?: boolean;
  color?: ButtonProps["color"];
  secondaryColor?: ButtonProps["color"];
  fullWidth?: boolean;
  contentClassName?: string;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  children,
  onSubmit,
  onClose,
  onCancel,
  title,
  submitTitle,
  submitDisabled,
  sx,
  cancelTitle,
  maxWidth,
  withoutButtons,
  color,
  secondaryColor = "secondary",
  fullWidth,
  contentClassName,
}) => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      sx={sx}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <DialogTitle variant="h4">
        <h4 className="mr-10 text-3xl font-bold">{title}</h4>

        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent className={contentClassName}>{children}</DialogContent>

      {withoutButtons ? null : (
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={onCancel ?? onClose}
            color="secondary"
            data-testid={testIds.cancel}
          >
            {cancelTitle ?? "Zavřít"}
          </Button>
          {onSubmit && (
            <Button
              onClick={onSubmit}
              disabled={submitDisabled}
              color="primary"
              data-testid={testIds.submit}
            >
              {submitTitle ?? "Potvrdit"}
            </Button>
          )}
        </DialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;
