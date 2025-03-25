"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, User, Users, Check, Sparkles, X, Moon, Coffee } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function RoommatesPage() {
  const [activeTab, setActiveTab] = useState("current")
  const { toast } = useToast()

  const currentRoommate = {
    id: "user-1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=128&width=128",
    major: "Computer Science",
    year: "Junior",
    hometown: "Chicago, IL",
    bio: "Hey! I'm a Computer Science major who loves coding, hiking, and binge-watching sci-fi shows. I'm pretty organized and prefer to study in the evenings.",
    compatibility: 85,
    preferences: {
      smoking: false,
      pets: true,
      guests: "Occasionally",
      studyTime: "Evening",
      sleepTime: "11 PM - 7 AM",
      cleanliness: "Neat",
      sharing: "Some items",
    },
    interests: ["Hiking", "Programming", "Movies", "Reading"],
  }

  const potentialRoommates = [
    {
      id: "user-2",
      name: "Alex Rivera",
      avatar: "/placeholder.svg?height=128&width=128",
      major: "Business Administration",
      year: "Junior",
      hometown: "Miami, FL",
      compatibility: 92,
      interests: ["Basketball", "Finance", "Travel"],
    },
    {
      id: "user-3",
      name: "Jordan Taylor",
      avatar: "/placeholder.svg?height=128&width=128",
      major: "Psychology",
      year: "Sophomore",
      hometown: "Seattle, WA",
      compatibility: 78,
      interests: ["Music", "Photography", "Cooking"],
    },
    {
      id: "user-4",
      name: "Morgan Chen",
      avatar: "/placeholder.svg?height=128&width=128",
      major: "Engineering",
      year: "Junior",
      hometown: "Boston, MA",
      compatibility: 85,
      interests: ["Robotics", "Gaming", "Hiking"],
    },
  ]

  const sendRoommateRequest = (userId: string) => {
    toast({
      title: "Request Sent",
      description: "Your roommate request has been sent successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Roommate Matching</h2>
        <p className="text-muted-foreground">View your current roommate and find potential matches</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card
          className={`cursor-pointer transition-all ${activeTab === "current" ? "border-primary" : ""}`}
          onClick={() => setActiveTab("current")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Roommate</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Sarah Johnson</div>
            <p className="text-xs text-muted-foreground">Computer Science, Junior</p>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${activeTab === "matches" ? "border-primary" : ""}`}
          onClick={() => setActiveTab("matches")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Matches</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Matches</div>
            <p className="text-xs text-muted-foreground">Based on your preferences</p>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${activeTab === "preferences" ? "border-primary" : ""}`}
          onClick={() => setActiveTab("preferences")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Preferences</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Update Preferences</div>
            <p className="text-xs text-muted-foreground">Refine your roommate criteria</p>
          </CardContent>
        </Card>
      </div>

      {activeTab === "current" && (
        <Card>
          <CardHeader>
            <CardTitle>Current Roommate</CardTitle>
            <CardDescription>Information about your current roommate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={currentRoommate.avatar} alt={currentRoommate.name} />
                  <AvatarFallback>{currentRoommate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{currentRoommate.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {currentRoommate.major}, {currentRoommate.year}
                  </p>
                  <p className="text-sm text-muted-foreground">From: {currentRoommate.hometown}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Bio</h4>
                  <p className="text-sm">{currentRoommate.bio}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Compatibility</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{currentRoommate.compatibility}% Match</span>
                      <span className="text-sm text-muted-foreground">Based on preferences</span>
                    </div>
                    <Progress value={currentRoommate.compatibility} className="h-2" />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentRoommate.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="text-sm font-medium mb-4">Roommate Preferences</h4>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {currentRoommate.preferences.smoking ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Smoking</p>
                    <p className="text-xs text-muted-foreground">
                      {currentRoommate.preferences.smoking ? "Yes" : "No"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {currentRoommate.preferences.pets ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pets</p>
                    <p className="text-xs text-muted-foreground">{currentRoommate.preferences.pets ? "Yes" : "No"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Guests</p>
                    <p className="text-xs text-muted-foreground">{currentRoommate.preferences.guests}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Moon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sleep Time</p>
                    <p className="text-xs text-muted-foreground">{currentRoommate.preferences.sleepTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Coffee className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Study Time</p>
                    <p className="text-xs text-muted-foreground">{currentRoommate.preferences.studyTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Cleanliness</p>
                    <p className="text-xs text-muted-foreground">{currentRoommate.preferences.cleanliness}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "matches" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Potential Roommates</h3>
            <div className="flex items-center gap-2">
              <Input placeholder="Search by name or major" className="w-64" />
              <Button variant="outline" size="sm">
                Filter
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {potentialRoommates.map((roommate) => (
              <Card key={roommate.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{roommate.name}</CardTitle>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                      {roommate.compatibility}% Match
                    </Badge>
                  </div>
                  <CardDescription>
                    {roommate.major}, {roommate.year}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={roommate.avatar} alt={roommate.name} />
                      <AvatarFallback>{roommate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">From: {roommate.hometown}</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {roommate.interests.map((interest) => (
                          <Badge key={interest} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                  <Button size="sm" onClick={() => sendRoommateRequest(roommate.id)}>
                    <Heart className="mr-2 h-4 w-4" />
                    Send Request
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "preferences" && (
        <Card>
          <CardHeader>
            <CardTitle>Roommate Preferences</CardTitle>
            <CardDescription>Update your preferences to find better roommate matches</CardDescription>
          </CardHeader>
          <CardContent>
            <RoommatePreferencesForm />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function RoommatePreferencesForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Preferences updated",
        description: "Your roommate preferences have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-4">Lifestyle Preferences</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Smoking Preference</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="no_smoking">No Smoking</option>
                <option value="smoking_ok">Smoking Okay</option>
                <option value="outside_only">Outside Only</option>
                <option value="no_preference">No Preference</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Pet Preference</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="no_pets">No Pets</option>
                <option value="pets_ok">Pets Okay</option>
                <option value="small_pets">Small Pets Only</option>
                <option value="no_preference">No Preference</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Guest Policy</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="rarely">Rarely (Few guests)</option>
                <option value="occasionally">Occasionally</option>
                <option value="frequently">Frequently</option>
                <option value="no_preference">No Preference</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Cleanliness Level</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="very_neat">Very Neat</option>
                <option value="neat">Neat</option>
                <option value="average">Average</option>
                <option value="relaxed">Relaxed</option>
                <option value="no_preference">No Preference</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Schedule Preferences</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Sleep Schedule</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="early_bird">Early Bird (Before 10 PM)</option>
                <option value="average">Average (10 PM - 12 AM)</option>
                <option value="night_owl">Night Owl (After 12 AM)</option>
                <option value="no_preference">No Preference</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Study Habits</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="morning">Morning Person</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
                <option value="no_preference">No Preference</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Noise Level</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="quiet">Quiet</option>
                <option value="moderate">Moderate</option>
                <option value="loud">Loud</option>
                <option value="no_preference">No Preference</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Social Level</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="very_social">Very Social</option>
                <option value="social">Social</option>
                <option value="moderate">Moderate</option>
                <option value="private">Private</option>
                <option value="no_preference">No Preference</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Personal Preferences</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Major/Field of Study Preference</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="same_major">Same Major</option>
                <option value="similar_field">Similar Field</option>
                <option value="different_field">Different Field</option>
                <option value="no_preference">No Preference</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Year in School</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="same_year">Same Year</option>
                <option value="any_year">Any Year</option>
                <option value="upperclassman">Upperclassman</option>
                <option value="lowerclassman">Lowerclassman</option>
                <option value="no_preference">No Preference</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Additional Notes</label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Any other preferences or requirements..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Updating..." : "Update Preferences"}
      </Button>
    </form>
  )
}

