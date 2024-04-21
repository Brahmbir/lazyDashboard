import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import ChangeAuthority from "./changeAuthority";

export async function AllMembers({ GroupId }: { GroupId: string }) {
  const data = await prisma.member.findMany({
    where: {
      GroupId: GroupId,
    },
  });
  console.log(data);
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Authority</TableHead>
          <TableHead className="text-right">Change Authority</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((value) => (
          <TableRow key={value.memberId}>
            <TableCell className="font-medium">{value.name}</TableCell>
            <TableCell>{value.email}</TableCell>
            <TableCell>{value.status}</TableCell>

            <TableCell className="text-right">
              <ChangeAuthority
                memberId={value.memberId}
                defaultS={value.status}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
