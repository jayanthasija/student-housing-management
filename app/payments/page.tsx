import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CreditCard, DollarSign, CheckCircle, FileText, Download, Calendar, AlertCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import PaymentMethodForm from "@/components/payment-method-form"
import MakePaymentForm from "@/components/make-payment-form"

export default function PaymentsPage() {
  const currentCharges = [
    {
      id: "CH-1234",
      description: "Fall Semester Housing",
      amount: 5000,
      dueDate: "2023-09-01",
      status: "Due",
    },
    {
      id: "CH-1235",
      description: "Meal Plan - Standard",
      amount: 2500,
      dueDate: "2023-09-01",
      status: "Due",
    },
    {
      id: "CH-1236",
      description: "Housing Deposit",
      amount: 250,
      dueDate: "2023-07-15",
      status: "Paid",
    },
  ]

  const paymentHistory = [
    {
      id: "PAY-1001",
      date: "2023-07-15",
      description: "Housing Deposit",
      amount: 250,
      method: "Credit Card (ending in 4242)",
    },
    {
      id: "PAY-900",
      date: "2023-05-10",
      description: "Housing Application Fee",
      amount: 50,
      method: "Credit Card (ending in 4242)",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
        <p className="text-muted-foreground">Manage your housing payments and billing information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$7,500.00</div>
            <p className="text-xs text-muted-foreground">Due by September 1, 2023</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,250.00</div>
            <p className="text-xs text-muted-foreground">Monthly installment due Sep 1</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Payment</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$250.00</div>
            <p className="text-xs text-muted-foreground">Housing Deposit on Jul 15</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Active payment method</p>
          </CardContent>
        </Card>
      </div>

      <Alert className="bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-900/10 dark:border-amber-900/20 dark:text-amber-600">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Payment Due Soon</AlertTitle>
        <AlertDescription>
          Your Fall semester payment of $7,500.00 is due on September 1, 2023. A late fee of $50 will be applied after
          the due date.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="charges" className="space-y-4">
        <TabsList>
          <TabsTrigger value="charges">Current Charges</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="charges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Charges</CardTitle>
              <CardDescription>View your current charges and make payments</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentCharges.map((charge) => (
                      <TableRow key={charge.id}>
                        <TableCell className="font-medium">
                          {charge.description}
                          <div className="text-xs text-muted-foreground">{charge.id}</div>
                        </TableCell>
                        <TableCell>{charge.dueDate}</TableCell>
                        <TableCell>${charge.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          {charge.status === "Due" ? (
                            <Badge
                              variant="outline"
                              className="bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-900/10 dark:border-amber-900/20 dark:text-amber-600"
                            >
                              Due
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-900 border-green-200 dark:bg-green-900/10 dark:border-green-900/20 dark:text-green-600"
                            >
                              Paid
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {charge.status === "Due" ? (
                            <Button variant="outline" size="sm">
                              Pay Now
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              Receipt
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <p className="text-sm font-medium">Total Due: $7,500.00</p>
                <p className="text-xs text-muted-foreground">Due by September 1, 2023</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  View Statement
                </Button>
                <Button>
                  <DollarSign className="mr-2 h-4 w-4" />
                  Make Payment
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Make a Payment</CardTitle>
              <CardDescription>Pay your housing charges using your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <MakePaymentForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View your payment history and download receipts</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Receipt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.description}</TableCell>
                        <TableCell>${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download All Receipts
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods for housing charges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-6 w-6" />
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 06/2025</p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>
              </div>

              <PaymentMethodForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

