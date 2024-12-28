import {Pencil2Icon} from "@radix-ui/react-icons";
import Link from "next/link";
import {Button} from "@radix-ui/themes";
import {Issue} from "@prisma/client";

interface EditIssueButtonProps {
    issue: Issue;
}

const EditIssueButton = ({issue}: EditIssueButtonProps) => {
    return (
        <Button>
            <Pencil2Icon />
            <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
    )
}

export default EditIssueButton