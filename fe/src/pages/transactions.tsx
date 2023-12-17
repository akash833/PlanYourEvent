import React, { useEffect, useState } from "react";
import Layout from "./components/layout";
import PaginatedItems from "./components/utility/pagination";
import AppLoader from "./components/utility/loader";
import { CALL_POST_API } from "@/api";

const Transaction = () => {
  const showPerPage = 10;
  const [loader, setLoader] = useState(false);
  const [transactionList, setTransactionList] = useState<any>([]);
  const [totalTransaction, setTotalTransaction] = useState();
  const [availableBalance, setAvailableBalance] = useState();

  const getTransactions = async (pageNum: any) => {
    setLoader(true);
    const body = {
      page: pageNum,
      pageSize: showPerPage,
    };

    const { success, data } = await CALL_POST_API("transaction/get", body);

    if (success) {
      
      setTransactionList(data.data);
      setAvailableBalance(data.balance);
      setTotalTransaction(data.total);
    }

    setLoader(false);
  };

  const getDate = (dateString: any) => {
    const date = new Date(dateString);

    // Define an array to convert the month index to its name
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${monthName} ${day}, ${year}`;
  };

  useEffect(() => {
    getTransactions(1);
  }, []);

  const callAPI = (pageNum: any) => {
    getTransactions(pageNum);
  };

  return (
    <Layout title="Transaction List" description="Transaction List">
      <div>
        <div className="text-sm py-2 px-6">
          <span style={{ color: "#13B497" }}>Event /</span> Transaction List
        </div>
        <div className="mt-8 event-main-table">
          <div className="hire-header transaction-header">
            <div>Date</div>
            <div>Credit/Debit</div>
            <div>Amount</div>
            <div>Description</div>
          </div>

          <div style={{ display: loader ? "none" : "block" }}>
            {transactionList?.length === 0 ? (
              <div className="text-center text-white text-xs mt-5">
                No record found
              </div>
            ) : (
              <div>
                <div className="hireEvents">
                  {transactionList?.map((e: any) => (
                    <div>
                      <div className="hire-header hire-header-child transaction-header">
                        <div>{getDate(e.date)}</div>
                        <div
                          style={{
                            color:
                              e.type === "Credit"
                                ? "rgb(19, 180, 151)"
                                : "#ff5454",
                          }}
                        >
                          {e.type}
                        </div>
                        <div>${e.amount}</div>
                        <div>{e?.description}</div>
                      </div>
                    </div>
                  ))}
                  <div>
                    <div className="hire-header hire-header-child transaction-header">
                      <div>Total Balance : ${availableBalance}</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between my-5">
                  <div className="text-white text-xs">
                    Showing {transactionList ? transactionList.length : 0} of {totalTransaction} Transactions 
                  </div>
                  <div>
                    <PaginatedItems
                      itemsPerPage={showPerPage}
                      eventsLength={totalTransaction}
                      onPageChange={callAPI}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: loader ? "block" : "none" }}>
          <div className="flex justify-center items-center h-64">
            <AppLoader />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Transaction;
