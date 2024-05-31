import { useDispatch, useSelector } from "react-redux";
import { useEffect, React } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Skeleton } from "@mui/material";
import "../Userlist.css";

const UserListSkel = () => {
  const { users } = useSelector((state) => state.userReducer);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row, i) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row">
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={50}
                    height={40}
                  />
                </TableCell>
                <TableCell align="right" scope="row">
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={110}
                    height={40}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={160}
                    height={40}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={130}
                    height={40}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex" }}>
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={70}
                      height={40}
                    />
                    &nbsp;&nbsp;
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={70}
                      height={40}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserListSkel;
