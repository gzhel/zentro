import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";

const Home = () => {
  const loggedIn = {
    firstName: "Grigorii",
    lastName: "Zheliabin",
    email: "gregoryzhel@gmail.com",
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type={"greeting"}
            title={"Welcome"}
            user={loggedIn?.firstName ?? "Guest"}
            subtext={
              "Access and manages your account and transactions efficiently."
            }
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT_TRANSACTIONS
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 120.3 }, { currentBalance: 150 }]}
      />
    </section>
  );
};

export default Home;
