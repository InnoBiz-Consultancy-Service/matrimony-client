"use client";

import * as React from "react";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  MoreHorizontal,
  Calendar,
  DollarSign,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

interface PaymentData {
  _id: string;
  additionalNotes: string;
  approvalStatus: "pending" | "approved" | "rejected";
  createdAt: string;
  durationInMonths: number;
  email: string;
  name: string;
  paidAmount: number;
  paymentDate: string;
  phone: string;
  senderNumber: string;
  subscriptionType: "basic" | "premium" | "vip";
  transactionId: string;
  updatedAt: string;
  userId: {
    email: string;
    role: string;
    _id: string;
  };
}

export default function PaymentPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [subscriptionFilter, setSubscriptionFilter] =
    React.useState<string>("all");
  const [payments, setPayments] = React.useState<PaymentData[]>([]);

  React.useEffect(() => {
    const fetchUserPayments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/payment/all`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log("User Payments:", response.data?.data);
        setPayments(response.data?.data);
      } catch (error) {
        console.log("Error fetching user payments:", error);
      }
    };
    fetchUserPayments();
  }, []);

  const approvePayment = async ({ id }: { id: string }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(payments);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSubscriptionBadge = (type: string) => {
    switch (type) {
      case "vip":
        return (
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            VIP
          </Badge>
        );
      case "premium":
        return (
          <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
            Premium
          </Badge>
        );
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString()}`;
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || payment.approvalStatus === statusFilter;
    const matchesSubscription =
      subscriptionFilter === "all" ||
      payment.subscriptionType === subscriptionFilter;

    return matchesSearch && matchesStatus && matchesSubscription;
  });

  // Mobile Card Component
  const PaymentCard = ({ payment }: { payment: PaymentData }) => (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              {payment.name}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">{payment.email}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            {getStatusBadge(payment.approvalStatus)}
            {getSubscriptionBadge(payment.subscriptionType)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="font-semibold text-green-600">
              {formatCurrency(payment.paidAmount)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">{payment.durationInMonths}M</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">{payment.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {payment.transactionId}
            </span>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {formatDate(payment.createdAt)}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Management
          </h1>
          <p className="text-gray-600">
            Manage and track all subscription payments and transactions
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or transaction ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-48 h-11">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              {/* Subscription Filter */}
              <Select
                value={subscriptionFilter}
                onValueChange={setSubscriptionFilter}
              >
                <SelectTrigger className="w-full lg:w-48 h-11">
                  <SelectValue placeholder="Filter by plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {filteredPayments.length} of {payments.length} payments
              </p>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mobile View - Cards */}
        <div className="lg:hidden">
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <PaymentCard key={payment._id} payment={payment} />
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No payments found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden lg:block">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Customer</TableHead>
                    <TableHead className="font-semibold">
                      Subscription
                    </TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Duration</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">
                      Transaction ID
                    </TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment._id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">
                              {payment.name}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <Mail className="h-3 w-3 mr-1" />
                              {payment.email}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <Phone className="h-3 w-3 mr-1" />
                              {payment.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getSubscriptionBadge(payment.subscriptionType)}
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-green-600">
                            {formatCurrency(payment.paidAmount)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600">
                            {payment.durationInMonths} months
                          </span>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(payment.approvalStatus)}
                        </TableCell>
                        <TableCell>
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {payment.transactionId}
                          </code>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{formatDate(payment.createdAt)}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              asChild
                              className="cursor-pointer"
                            >
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  approvePayment({ id: payment?.userId?._id })
                                }
                                className="cursor-pointer"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                          <Search className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                          No payments found
                        </h3>
                        <p className="text-gray-500">
                          Try adjusting your search or filter criteria
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
