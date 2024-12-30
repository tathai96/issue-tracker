'use client';

import {Select} from "@radix-ui/themes";
import {Issue, User} from "@prisma/client";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

interface AssigneeSelectProps {
    issue: Issue;
}


const AssigneeSelect = ({issue}: AssigneeSelectProps) => {
    const {data: users, error, isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: () => axios.get<User[]>('/api/users').then(res => res.data),
        staleTime: 60*1000,
        retry: 3
    });

    if(isLoading) {
        return <Skeleton />
    }

    if(error) {
        return null;
    }

    return (
        <Select.Root defaultValue={issue.assignedToUserId || 'unassigned'} onValueChange={(userId) => {
            if(userId === 'unassigned') {
                axios.patch('/api/issues/'+issue.id, { assignedToUserId: null })
            } else {
                axios.patch('/api/issues/'+issue.id, { assignedToUserId: userId })
            }
        }}>
            <Select.Trigger placeholder={"Assign..."} />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value="unassigned">Unassigned</Select.Item>
                    { users?.map(user =>
                        (<Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)
                    )}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect