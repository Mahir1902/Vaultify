'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SignInButton, SignOutButton, SignedIn, SignedOut, useOrganization, useSession, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {

  const session = useSession();
  const organization = useOrganization()
  const user = useUser()

  
  let orgId: string | undefined = undefined
  if(organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }

  const createFile = useMutation(api.files.createFile)
  const files =  useQuery(api.files.getFiles, orgId ? {orgId} : 'skip') //if orgId is defined then use it otherwise skip the query




  return (
    <main className=" flex gap-5">

      

      {files?.map((file) => (
        <div key={file._id}>
          <p>{file.name}</p>
        </div>
      ))}

     <Button onClick={() => {

      if(!orgId) {
        return
      }

      createFile({
        name: 'Hello world',
        orgId
      })
      console.log('created file')
     }}>Click Me</Button>
    </main>
  );
}
