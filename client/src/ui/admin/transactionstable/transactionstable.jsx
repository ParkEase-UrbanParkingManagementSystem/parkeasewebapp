"use client";
import React, { useState ,useEffect} from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";  
import { toast } from "react-hot-toast";

export default function TransactionsTable({ transactions }) {
  const [isTopUpDialogOpen, setIsTopUpDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [topUpAmount, setTopUpAmount] = useState(""); // State for top-up amount
  const [isLoading, setIsLoading] = useState(false);
  const [pmcId, setPmcId] = useState(null);


  const currentDate = new Date().toISOString().split("T")[0];

  const handlePaymentClick = (transaction) => {
    setSelectedTransaction(transaction); // Set the clicked transaction
    setTopUpAmount(transaction.full_toll_amount); // Initialize top-up amount
    setPmcId(transaction.pmc_id);
    setIsTopUpDialogOpen(true); // Open the dialog
  };

  const handleTopUp = async () => {
    if (!topUpAmount || parseFloat(topUpAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    // Proceed with payment logic
    setIsLoading(true);
    try {
        const response = await fetch("/api/admin-to-pmc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: parseFloat(topUpAmount),
            pmc_id:pmcId,

          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          window.location.href = data.url;
        } else {
          toast.error(data.message || "An error occurred");
        }
      } catch (error) {
        console.error("Error initiating top-up:", error);
        toast.error("An error occurred during top-up request");
      } finally {
        setIsLoading(false);
      }
  };

  const completeTopUp = async (sessionId,pmc_id) => {
    console.log("in function pmc_id", pmcId);
    console.log("in functionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      
      console.log("Completing top-up with funcccccccccccccccccccccccccc:", sessionId);

      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_API_KEY}/pmctype/subscription`,
        `${process.env.NEXT_PUBLIC_API_KEY}/admin/admin-to-pmc`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ session_id: sessionId , pmc_id:pmc_id }),
        }
      );
      const data = await response.json();
      console.log("fetchedddddddddddddddddddddddddddddd");
      console.log("response",data);

      if (response.ok) {
        console.log("Top-up completed successfullyyyyyyyyyyyyyy:", data);
        toast.success(data.message);
      } else {
        console.error("Error completing top-up erorrrrrrrrrrrrrrrrrr:", data);
        toast.error(data.message || "An error occurred during top-up");
      }
    } catch (error) {
      console.error("Error completing top-up:", error);
      toast.error("An error occurred during top-up");
    } finally {
      setIsLoading(false);
      // Clear session_id from the URL
      window.history.replaceState({}, document.title, "/admin/allTransactions");
      window.location.href = "/admin/allTransactions";
    }
  };

  useEffect(() => {
    // fetchWalletBalance();
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");
    const pmc_id = urlParams.get("pmc_id");
    if (sessionId) {
      console.log("go toooooooooooooooooooooo")
      completeTopUp(sessionId,pmc_id);
    }
  }, []);



  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 mt-10 ml-5 mr-5">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr style={{ backgroundColor: "rgb(255, 180, 3)" }}>
            <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              PMC Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Date
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Total Toll Collected
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {transaction.pmc_name}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {currentDate}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                Rs. {transaction.full_toll_amount}
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                    {transaction.paid ? (
                        <button
                        className="inline-block rounded bg-gray-500 px-4 py-2 text-xs font-medium text-white cursor-not-allowed"
                        disabled
                        >
                        PAID
                        </button>
                    ) : (
                        <button
                        onClick={() => handlePaymentClick(transaction)}
                        className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                        >
                        Make Payment
                        </button>
                    )}
                </td>

            </tr>
          ))}
        </tbody>
      </table>

      {selectedTransaction && (
        <Dialog open={isTopUpDialogOpen} onOpenChange={setIsTopUpDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Details for {selectedTransaction.pmc_name}</DialogTitle>
              <DialogDescription>
                Value for {currentDate}: Rs. {selectedTransaction.full_toll_amount}
              </DialogDescription>
            </DialogHeader>
            <Input
              type="number"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)} // Allows editing if needed
              readOnly
            />

            <Button onClick={handleTopUp} disabled={false}>
              Proceed to Payment
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
