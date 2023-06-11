"use client";

import { useCallback } from "react";

import { SnackbarMessage, useSnackbar } from "notistack";

import MessageToast from "./MessageToast";

interface MessageOptions {
  description?: string | React.ReactNode;
  onInfoClick?: () => void;
}

const useMessage = () => {
  const { enqueueSnackbar } = useSnackbar();

  return {
    info: useCallback(
      (snackbarMessage: SnackbarMessage, options: MessageOptions = {}) =>
        enqueueSnackbar(snackbarMessage, {
          content: (key, message) => (
            <MessageToast
              id={key}
              message={message}
              description={options.description}
              onInfoClick={options.onInfoClick}
              severity="info"
            />
          ),
        }),
      [enqueueSnackbar]
    ),

    success: useCallback(
      (snackbarMessage: SnackbarMessage, options: MessageOptions = {}) =>
        enqueueSnackbar(snackbarMessage, {
          content: (key, message) => (
            <MessageToast
              id={key}
              message={message}
              description={options.description}
              onInfoClick={options.onInfoClick}
              severity="success"
            />
          ),
        }),
      [enqueueSnackbar]
    ),

    warning: useCallback(
      (snackbarMessage: SnackbarMessage, options: MessageOptions = {}) =>
        enqueueSnackbar(snackbarMessage, {
          autoHideDuration: null,
          content: (key, message) => (
            <MessageToast
              id={key}
              message={message}
              description={options.description}
              onInfoClick={options.onInfoClick}
              severity="warning"
            />
          ),
        }),
      [enqueueSnackbar]
    ),

    error: useCallback(
      (snackbarMessage: SnackbarMessage, options: MessageOptions = {}) =>
        enqueueSnackbar(snackbarMessage, {
          autoHideDuration: null,
          content: (key, message) => (
            <MessageToast
              id={key}
              message={message}
              description={options.description}
              onInfoClick={options.onInfoClick}
              severity="error"
            />
          ),
        }),
      [enqueueSnackbar]
    ),
  };
};

export default useMessage;
