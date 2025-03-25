"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, DollarSign } from "lucide-react"

const formSchema = z.object({
  amount: z
    .string()
    .min(1, {
      message: "Amount is required.",
    })
    .refine((val) => !isNaN(Number.parseFloat(val)) && Number.parseFloat(val) > 0, {
      message: "Amount must be a positive number.",
    }),
  paymentType: z.enum(["full", "partial", "installment"], {
    required_error: "Please select a payment type.",
  }),
  paymentMethod: z.string({
    required_error: "Please select a payment method.",
  }),
  saveMethod: z.boolean().default(false),
})

export default function MakePaymentForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "7500.00",
      paymentType: "full",
      paymentMethod: "card",
      saveMethod: true,
    },
  })

  const watchPaymentType = form.watch("paymentType")

  // Update amount based on payment type
  const updateAmount = (type: string) => {
    switch (type) {
      case "full":
        form.setValue("amount", "7500.00")
        break
      case "partial":
        form.setValue("amount", "")
        break
      case "installment":
        form.setValue("amount", "1250.00")
        break
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Payment successful",
        description: `Your payment of $${values.amount} has been processed successfully.`,
      })
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="paymentType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Payment Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value)
                    updateAmount(value)
                  }}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="full" />
                    </FormControl>
                    <FormLabel className="font-normal">Pay in Full ($7,500.00)</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="partial" />
                    </FormControl>
                    <FormLabel className="font-normal">Partial Payment</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="installment" />
                    </FormControl>
                    <FormLabel className="font-normal">Monthly Installment ($1,250.00)</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input {...field} placeholder="0.00" className="pl-9" readOnly={watchPaymentType !== "partial"} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="card">Credit Card (Visa ending in 4242)</SelectItem>
                  <SelectItem value="new_card">Add New Credit Card</SelectItem>
                  <SelectItem value="bank">Bank Account</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("paymentMethod") === "new_card" && (
          <div className="space-y-4 border p-4 rounded-lg">
            <h3 className="font-medium">New Credit Card</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormLabel>Card Number</FormLabel>
                <Input placeholder="4242 4242 4242 4242" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <FormLabel>Expiry Date</FormLabel>
                  <Input placeholder="MM/YY" />
                </div>
                <div className="grid gap-2">
                  <FormLabel>CVC</FormLabel>
                  <Input placeholder="123" />
                </div>
              </div>
              <div className="grid gap-2">
                <FormLabel>Cardholder Name</FormLabel>
                <Input placeholder="John Doe" />
              </div>
            </div>
          </div>
        )}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Pay ${form.watch("amount")}
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}

