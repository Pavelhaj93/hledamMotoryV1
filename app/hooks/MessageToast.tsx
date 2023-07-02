"use client";

import { forwardRef, useCallback, useState } from "react";

import { SnackbarContent, useSnackbar } from "notistack";

import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Alert, AlertColor, IconButton, Paper } from "@mui/material";

interface MessageToastProps {
  id: string | number;
  severity?: AlertColor;
  message: string | React.ReactNode;
  description?: string | React.ReactNode;
  onInfoClick?: () => void;
}

const MessageToast = forwardRef<HTMLDivElement, MessageToastProps>(
  ({ id, severity, message, description, onInfoClick }, ref) => {
    const { closeSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = useCallback(() => {
      setExpanded((value) => !value);
    }, []);

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <SnackbarContent ref={ref}>
        <Alert
          severity={severity}
          variant="filled"
          elevation={6}
          sx={{
            width: "100%",
            ...(expanded && {
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            }),
          }}
          action={
            <>
              {onInfoClick && (
                <IconButton size="small" onClick={onInfoClick}>
                  <InfoOutlinedIcon
                    sx={{
                      color: (theme) => theme.palette.primary.contrastText,
                    }}
                  />
                </IconButton>
              )}
              {description && (
                <IconButton
                  size="small"
                  onClick={handleExpandClick}
                  sx={{
                    transition: (theme) =>
                      theme.transitions.create("transform", {
                        duration: theme.transitions.duration.shortest,
                      }),
                    ...(expanded && {
                      transform: "rotate(180deg)",
                    }),
                  }}
                >
                  <ExpandMoreIcon
                    sx={{
                      color: (theme) => theme.palette.primary.contrastText,
                    }}
                  />
                </IconButton>
              )}
              <IconButton size="small" onClick={handleDismiss}>
                <CloseIcon
                  sx={{ color: (theme) => theme.palette.primary.contrastText }}
                />
              </IconButton>
            </>
          }
        >
          {message}
        </Alert>

        {expanded && (
          <Paper
            elevation={6}
            sx={{
              width: "100%",
              p: 2,
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
            }}
          >
            {description}
          </Paper>
        )}
      </SnackbarContent>
    );
  }
);

MessageToast.displayName = "MessageToast";

export default MessageToast;
