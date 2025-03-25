"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MessageSquare, Star, Send, ThumbsUp } from "lucide-react"
import { useState } from "react"
import FeedbackForm from "@/components/feedback-form"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState("submit")

  const feedbackHistory = [
    {
      id: "fb-1",
      date: "2023-09-01",
      category: "Maintenance",
      title: "Slow Response to Request",
      description: "My maintenance request for a leaking faucet took over a week to be addressed.",
      status: "Resolved",
      response: "We apologize for the delay. We've added additional maintenance staff to improve response times.",
    },
    {
      id: "fb-2",
      date: "2023-08-15",
      category: "Facility",
      title: "Study Room Availability",
      description: "The study rooms are often overcrowded, especially during exam periods.",
      status: "Under Review",
      response: null,
    },
  ]

  const surveys = [
    {
      id: "survey-1",
      title: "Move-In Experience Survey",
      description: "Please share your feedback about your recent move-in experience.",
      dueDate: "2023-09-15",
      status: "Open",
      questions: 10,
      estimatedTime: "5 min",
    },
    {
      id: "survey-2",
      title: "Dining Hall Satisfaction",
      description: "Help us improve your dining experience.",
      dueDate: "2023-09-20",
      status: "Open",
      questions: 8,
      estimatedTime: "4 min",
    },
    {
      id: "survey-3",
      title: "Roommate Matching Effectiveness",
      description: "Evaluate how well the roommate matching process worked for you.",
      dueDate: "2023-08-30",
      status: "Closed",
      questions: 12,
      estimatedTime: "6 min",
    },
  ]

  const communityFeedback = [
    {
      id: "cf-1",
      author: "Sarah J.",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2023-09-02",
      title: "WiFi Speed Improvement",
      content:
        "I've noticed a significant improvement in the WiFi speed throughout the dorm. Great job on the upgrade!",
      likes: 15,
      comments: 3,
      liked: true,
    },
    {
      id: "cf-2",
      author: "Mike T.",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2023-09-01",
      title: "Weekend Activity Suggestions",
      content:
        "It would be great to have more organized weekend activities for residents who stay on campus during weekends.",
      likes: 8,
      comments: 5,
      liked: false,
    },
    {
      id: "cf-3",
      author: "Lisa R.",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2023-08-28",
      title: "Common Area Cleanliness",
      content: "The common areas could be cleaned more frequently, especially during high-usage periods.",
      likes: 12,
      comments: 7,
      liked: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Feedback & Surveys</h2>
        <p className="text-muted-foreground">Share your thoughts and help us improve your housing experience</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card
          className={`cursor-pointer transition-all ${activeTab === "submit" ? "border-primary" : ""}`}
          onClick={() => setActiveTab("submit")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submit Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Share Your Thoughts</div>
            <p className="text-xs text-muted-foreground">Submit general feedback or suggestions</p>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${activeTab === "surveys" ? "border-primary" : ""}`}
          onClick={() => setActiveTab("surveys")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Surveys</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 Surveys</div>
            <p className="text-xs text-muted-foreground">Open surveys requiring your response</p>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${activeTab === "community" ? "border-primary" : ""}`}
          onClick={() => setActiveTab("community")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Feedback</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">View & Respond</div>
            <p className="text-xs text-muted-foreground">Review and engage with community feedback</p>
          </CardContent>
        </Card>
      </div>

      {activeTab === "submit" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit Feedback</CardTitle>
              <CardDescription>Share your thoughts about your housing experience</CardDescription>
            </CardHeader>
            <CardContent>
              <FeedbackForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback History</CardTitle>
              <CardDescription>View your previous feedback submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Response</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedbackHistory.map((feedback) => (
                    <TableRow key={feedback.id}>
                      <TableCell>{feedback.date}</TableCell>
                      <TableCell>{feedback.category}</TableCell>
                      <TableCell>
                        <div className="font-medium">{feedback.title}</div>
                        <div className="text-sm text-muted-foreground">{feedback.description.substring(0, 30)}...</div>
                      </TableCell>
                      <TableCell>
                        {feedback.status === "Resolved" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                            Resolved
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
                          >
                            Under Review
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "surveys" && (
        <div className="space-y-6">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Surveys Available</AlertTitle>
            <AlertDescription>
              You have 2 open surveys to complete. Your feedback helps us improve our services.
            </AlertDescription>
          </Alert>

          <div className="grid gap-6 md:grid-cols-2">
            {surveys.map((survey) => (
              <Card key={survey.id} className={survey.status === "Closed" ? "opacity-70" : ""}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{survey.title}</CardTitle>
                    {survey.status === "Open" ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Open</Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-slate-100 text-slate-800 hover:bg-slate-100 border-slate-200"
                      >
                        Closed
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{survey.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span>{survey.questions} Questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span>{survey.estimatedTime}</span>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">Due by: {survey.dueDate}</div>
                </CardContent>
                <CardFooter>
                  {survey.status === "Open" ? (
                    <Button className="w-full">Take Survey</Button>
                  ) : (
                    <Button disabled className="w-full">
                      Closed
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "community" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Feedback</CardTitle>
              <CardDescription>View and engage with feedback from other residents</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-6">
                  {communityFeedback.map((feedback) => (
                    <div key={feedback.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={feedback.avatar} alt={feedback.author} />
                            <AvatarFallback>{feedback.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{feedback.author}</div>
                            <div className="text-sm text-muted-foreground">{feedback.date}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-lg font-semibold">{feedback.title}</h4>
                        <p className="mt-2">{feedback.content}</p>
                      </div>

                      <div className="mt-4 flex items-center gap-6">
                        <Button variant="ghost" size="sm" className={feedback.liked ? "text-primary" : ""}>
                          <ThumbsUp className="mr-2 h-4 w-4" />
                          {feedback.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          {feedback.comments}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Send className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Post New Feedback
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

const MoreVerticalIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
)

