'use client';

import {AlertDialog, Button, Flex} from "@radix-ui/themes";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "react-toastify";
import Spinner from "@/app/components/Spinner";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button disabled={isDeleting} color={"red"}>
                    { isDeleting ? "Deleting issue ..." : "Delete Issue" }
                    { isDeleting && <Spinner /> }
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure you want to delete this issue? This action cannot be undone.
                </AlertDialog.Description>
                <Flex mt={"4"} gap={"3"}>
                    <AlertDialog.Cancel>
                        <Button variant={"soft"} color={"gray"}>Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color={"red"} onClick={async () => {
                            try {
                                setIsDeleting(true);
                                await axios.delete('/api/issues/' + issueId);
                                setError(false);
                                router.push('/issues');
                                router.refresh();
                            }
                            catch (error) {
                                setError(true);
                                toast('Some error has occurred.', { type: 'error' })
                            }
                            finally {
                                setIsDeleting(false);
                            }
                        }}>
                            Delete Issue
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>

    )
}

export default DeleteIssueButton;