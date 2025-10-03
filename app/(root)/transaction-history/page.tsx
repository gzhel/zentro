import React from "react";
import HeaderBox from "@/components/HeaderBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { formatAmount } from "@/lib/utils";
import TransactionsTable from "@/components/TransactionsTable";
import { Pagination } from "@/components/Pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "@/components/BankTabItem";
import Link from "next/link";
import { redirect } from "next/navigation";

const TransactionHistory = async ({
  searchParams: { id, page },
}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;

  const loggedIn = await getLoggedInUser();
  if (!loggedIn) {
    redirect("/sign-in");
  }

  const accounts = await getAccounts({ userId: loggedIn.$id });
  if (!accounts) {
    return null;
  }

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  const account: GetAccountResult = await getAccount({ appwriteItemId });

  const rowsPerPage = 10;
  const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = account?.transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction,
  );

  return (
    <section className={"transactions h-screen"}>
      <div className={"transactions-header"}>
        <HeaderBox
          title={"Transaction History"}
          subtext={"See your bank details and transactions."}
        />
      </div>

      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className={"recent-transactions-tablist"}>
          {accountsData?.map((account: Account) => (
            <TabsTrigger key={account.id} value={account.appwriteItemId}>
              <Link
                href={`?id=${account.appwriteItemId}&page=1`}
                scroll={false}
                prefetch
              >
                <BankTabItem
                  key={account.id}
                  account={account}
                  appwriteItemId={appwriteItemId}
                />
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={appwriteItemId} className="space-y-4">
          <div className="space-y-6">
            <div className="transactions-account">
              <div className="flex flex-col gap-2">
                <h2 className="text-18 font-bold text-white">
                  {account?.data.name}
                </h2>
                <p className="text-14 text-blue-25">
                  {account?.data.officialName}
                </p>
                <p className="text-14 font-semibold tracking-[1.1px] text-white">
                  ●●●● ●●●● ●●●● {account?.data.mask}
                </p>
              </div>

              <div className="transactions-account-balance">
                <p className="text-14">Current balance</p>
                <p className="text-24 text-center font-bold">
                  {formatAmount(account?.data.currentBalance ?? 0)}
                </p>
              </div>
            </div>

            <section className="flex w-full flex-col gap-6">
              <TransactionsTable transactions={currentTransactions ?? []} />
              {totalPages > 1 && (
                <div className="my-4 w-full">
                  <Pagination page={currentPage} totalPages={totalPages} />
                </div>
              )}
            </section>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default TransactionHistory;
