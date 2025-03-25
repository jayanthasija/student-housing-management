import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wrench, CheckCircle, Clock, X, AlertCircle } from "lucide-react"
import MaintenanceRequestForm from "@/components/maintenance-request-form"
import Link from "next/link"

export default function MaintenancePage() {
  const pendingRequests = [
    {
      id: "MR-1234",
      title: "Leaking Faucet",
      description: "The bathroom sink faucet is leaking and wasting water.",
      location: "Smith Hall, Room 302",
      priority: "Medium",
      status: "Pending",
      submitted: "2023-09-05",
    },
  ]

  const inProgressRequests = [
    {
      id: "MR-1200",
      title: "Broken Light Fixture",
      description: "The ceiling light in the common area is not working.",
      location: "Smith Hall, Room 302",
      priority: "High",
      status: "In Progress",
      submitted: "2023-09-01",
      scheduled: "2023-09-10",
    },
  ]

  const completedRequests = [
    {
      id: "MR-1100",
      title: "Wi-Fi Connection Issue",
      description: "Having trouble connecting to the dorm Wi-Fi network.",
      location: "Smith Hall, Room 302",
      priority: "High",
      status: "Completed",
      submitted: "2023-08-28",
      completed: "2023-08-30",
    },
    {
      id: "MR-1150",
      title: "AC Not Working",
      description: "The air conditioner is not cooling properly.",
      location: "Smith Hall, Room 302",
      priority: "Medium",
      status: "Completed",
      submitted: "2023-08-25",
      completed: "2023-08-27",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Maintenance Requests</h2>
        <p className="text-muted-foreground">Submit and track maintenance requests for your residence</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressRequests.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedRequests.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <Link href="#new-request">
            <Button>
              <Wrench className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </Link>
        </div>

        <TabsContent value="all" className="space-y-4">
          {pendingRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
          {inProgressRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
          {completedRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {inProgressRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </TabsContent>
      </Tabs>

      <div id="new-request" className="pt-6">
        <Card>
          <CardHeader>
            <CardTitle>New Maintenance Request</CardTitle>
            <CardDescription>Submit a new request for maintenance in your residence</CardDescription>
          </CardHeader>
          <CardContent>
            <MaintenanceRequestForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function RequestCard({ request }: { request: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{request.title}</CardTitle>
          <StatusBadge status={request.status} />
        </div>
        <CardDescription>{request.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{request.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <div>ID: {request.id}</div>
          <div>Priority: {request.priority}</div>
          <div>Submitted: {request.submitted}</div>
          {request.scheduled && <div>Scheduled: {request.scheduled}</div>}
          {request.completed && <div>Completed: {request.completed}</div>}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          View Details
        </Button>
        {request.status === "Pending" && (
          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Pending") {
    return (
      <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 dark:bg-amber-800/20 dark:text-amber-500">
        <Clock className="h-3 w-3" />
        Pending
      </div>
    )
  }

  if (status === "In Progress") {
    return (
      <div className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-800/20 dark:text-blue-500">
        <AlertCircle className="h-3 w-3" />
        In Progress
      </div>
    )
  }

  if (status === "Completed") {
    return (
      <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-800/20 dark:text-green-500">
        <CheckCircle className="h-3 w-3" />
        Completed
      </div>
    )
  }

  return null
}

