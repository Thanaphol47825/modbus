import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Typography,
  Card,
  CardContent,
  CardHeader,
  TablePagination,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  GetAllUserService,
  DeleteAccount,
  ChangePermission,
} from "../../services/userService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const StaffManage = () => {
  const [userList, setUserList] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    GetAllUserService()
      .then((result) => {
        setUserList(result.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <Container>
      <CssBaseline />
      <Card>
        <CardHeader
          avatar={<ManageAccountsIcon />}
          titleTypographyProps={{ variant: "h5" }}
          title={`จัดการพนักงาน`}
        />
        <CardContent>
          {/* using table */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ชื่อผู้ใช้</TableCell>
                <TableCell align="center">ชื่อ</TableCell>
                <TableCell align="center">นามสกุล</TableCell>
                <TableCell align="center">อีเมล</TableCell>
                <TableCell align="center">เบอร์โทร</TableCell>
                <TableCell align="center">สิทธิ์</TableCell>
                <TableCell align="center">จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.surname}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.mobile}</TableCell>
                      <TableCell align="center">
                        {user.role == 1 ? "เจ้าหน้าที่" : "ผู้ใช้"}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={
                            user.username == localStorage.getItem("username")
                              ? true
                              : false
                          }
                          onClick={() => {
                            MySwal.fire({
                              title:
                                "คุณต้องการเปลี่ยนสิทธิ์ผู้ใช้นี้ใช่หรือไม่?",
                              text: "คุณจะไม่สามารถย้อนกลับได้",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",

                              confirmButtonText: "ใช่, เปลี่ยนสิทธิ์ผู้ใช้",
                              cancelButtonText: "ยกเลิก",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                ChangePermission(
                                  user.user_id,
                                  user.role == 1 ? 0 : 1
                                ).then((result) => {
                                  MySwal.fire(
                                    "เปลี่ยนสิทธิ์สำเร็จ!",
                                    "เปลี่ยนสิทธิ์ผู้ใช้สำเร็จ",
                                    "success"
                                  );
                                  location.reload();
                                });
                              }
                            });
                          }}
                        >
                          เปลี่ยนสิทธิ์ผู้ใช้
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            MySwal.fire({
                              title: "คุณต้องการลบบัญชีนี้ใช่หรือไม่?",
                              text: "คุณจะไม่สามารถกู้คืนบัญชีนี้ได้หากลบแล้ว",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "ใช่, ลบบัญชีนี้!",
                              cancelButtonText: "ยกเลิก",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                DeleteAccount(user.user_id)
                                  .then(() => {
                                    MySwal.fire({
                                      title: "ลบบัญชีสำเร็จ!",
                                      text: "บัญชีของคุณถูกลบแล้ว",
                                      icon: "success",
                                      timer: 2000,
                                    }).then(() => {
                                      location.reload();
                                    });
                                  })
                                  .catch((err) => {
                                    MySwal.fire(
                                      "ลบบัญชีไม่สำเร็จ!",
                                      "บัญชีของคุณไม่ถูกลบ",
                                      "error"
                                    );
                                  });
                              }
                            });
                          }}
                        >
                          ลบบัญชี
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            count={userList.length}
            onPageChange={handleChangePage}
            page={page}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            showFirstButton={true}
            showLastButton={true}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default StaffManage;
