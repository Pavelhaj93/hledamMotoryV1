"use client";

import { useCallback } from "react";

import { type SnackbarMessage, useSnackbar } from "notistack";

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
              variant="info"
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
              variant="success"
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
              variant="warning"
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
              variant="destructive"
            />
          ),
        }),
      [enqueueSnackbar]
    ),
  };
};

export default useMessage;
