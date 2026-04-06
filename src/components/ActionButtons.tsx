"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CopyIcon,
  SendIcon,
  CheckIcon,
  ShareIcon,
} from "lucide-react";
import { copyToClipboard, shareToWhatsApp } from "@/lib/utils";

interface ActionButtonsProps {
  text: string;
  disabled?: boolean;
  onSave?: () => void;
  isLoggedIn?: boolean;
}

export function ActionButtons({
  text,
  disabled = false,
  onSave,
  isLoggedIn = false,
}: ActionButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;

    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppShare = () => {
    if (!text) return;
    shareToWhatsApp(text);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        variant="outline"
        className="flex-1 gap-2"
        onClick={handleCopy}
        disabled={disabled || !text}
      >
        {copied ? (
          <>
            <CheckIcon className="h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <CopyIcon className="h-4 w-4" />
            Copy
          </>
        )}
      </Button>

      <Button
        variant="whatsapp"
        className="flex-1 gap-2"
        onClick={handleWhatsAppShare}
        disabled={disabled || !text}
      >
        <SendIcon className="h-4 w-4" />
        Share to WhatsApp
      </Button>

      {isLoggedIn && onSave && (
        <Button
          variant="ghost"
          className="gap-2"
          onClick={onSave}
          disabled={disabled || !text}
        >
          <ShareIcon className="h-4 w-4" />
          Save
        </Button>
      )}
    </div>
  );
}