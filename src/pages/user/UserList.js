import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteUser, fetchUsers } from "../../redux";
import UserListSkel from "./skeleton/UserListSkel";



function UserList() {
  const { users } = useSelector((state) => state.userReducer);
  const [dataLOad, setdataLOad] = useState(false);
  console.log(users);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    setdataLOad(true);
    dispatch(fetchUsers({ navigate }));
    setTimeout(() => {
      setdataLOad(false);
    }, 500);
  }, []);

  const handleaddUser = () => {
    navigate("/add");

    // dispatch(addUsers({name:"email@gmail.com"}))
  };

  const handleDelete = (id) => {
    dispatch(deleteUser({ id, navigate })).then((res) => {
      if (res.payload.data.status == 200) {
        dispatch(fetchUsers({ navigate }));
      }
    });
  };
  const handleEdit = (id) => {
    navigate("/add", { state: id });
  };

  return (
    <>
      <Box className="userlist-wrapper">
        <Box className="add-btn-area">
          <Button variant="contained" onClick={handleaddUser}>
            ADD USER
          </Button>
        </Box>
        {/* add skeleton */}
        {dataLOad ? (
          <Box className="skaleton-Box">
            <UserListSkel />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">NAME</TableCell>
                  <TableCell align="right">EMAIL</TableCell>
                  <TableCell align="right">MOBILE</TableCell>
                  <TableCell align="right">ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users && users.length > 0 ? (
                  users?.map((row, i) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell scope="row">{i + 1}</TableCell>
                      <TableCell align="right" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.mobile}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          onClick={() => handleEdit(row?._id)}
                        >
                          EDIT
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(row?._id)}
                        >
                          delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <Box className="no-data-btn">No Data</Box>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
}

export default UserList;
