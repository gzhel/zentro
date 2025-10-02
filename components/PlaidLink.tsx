"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.actions";
import Image from "next/image";
import { cn } from "@/lib/utils";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };
    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });
      router.push("/");
    },
    [user],
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  if (variant === "primary") {
    return (
      <Button onClick={open} disabled={!ready} className={"plaidlink-primary"}>
        Connect bank
      </Button>
    );
  }

  if (variant === "ghost") {
    return (
      <Button onClick={open} variant={"ghost"} className={"plaidlink-ghost"}>
        <Image
          src={"/icons/connect-bank.svg"}
          alt={"connect bank"}
          width={24}
          height={24}
        />
        <p className={"hidden text-[16px] font-semibold text-black-2 xl:block"}>
          Connect bank
        </p>
      </Button>
    );
  }

  return (
    <Button onClick={open} className={"plaidlink-default"}>
      <div className={"relative size-6"}>
        <Image
          src={"/icons/connect-bank.svg"}
          alt={"connect bank"}
          width={24}
          height={24}
        />
      </div>

      <p
        className={cn("text-[16px] font-semibold text-black-2 hidden xl:block")}
      >
        Connect bank
      </p>
    </Button>
  );
};

export default PlaidLink;
