import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Button from '@mui/material/Button';





const API_url = "http://localhost:8082/";



function DashboardComponent(){

    const [usersArray, setUsersArray] = useState(null);
    const [nonVerifiedExperts, setNonVerifiedExperts] = useState(null);
    const [verifiedExperts, setVerifiedExperts] = useState(null);

    const banSimpleUserTriggered = async (id) => {
        await axios.put(API_url+`user/banUser/${id}`).then(
            (res) => fetchArrayOfUsers()
        ).catch(
            (error) => console.log(error)
        )
    }
    const banExpertTroggered = async (id) => {
        await axios.put(API_url+`expert/banUser/${id}`).then(
            (res) => {
                fetchArrayOfNonVerifiedExperts();
                fetchArrayOfVerifiedExperts();
            }
        ).catch(
            (error) => console.log(error)
        )
    }
    const activateExpertTriggered = async (id) => {
        await axios.put(API_url+`expert/verifyUser/${id}`).then(
            (res) => {
                fetchArrayOfNonVerifiedExperts();
                fetchArrayOfVerifiedExperts();
            }
        ).catch(
            (error) => console.log(error)
        )
    }


    const fetchArrayOfUsers = async () => {
        await axios.get(API_url+"user/getAll").then(
            (res) => setUsersArray(res.data)
        ).catch(
            (error) => console.log(error)
        );
    }
    const fetchArrayOfNonVerifiedExperts = async () => {
        await axios.get(API_url+"expert/getNonVerified").then(
            (res) => setNonVerifiedExperts(res.data)
        ).catch(
            (error) => console.log(error)
        );
    }
    const fetchArrayOfVerifiedExperts = async () => {
        await axios.get(API_url+"expert/getVerified").then(
            (res) => setVerifiedExperts(res.data)
        ).catch(
            (error) => console.log(error)
        );
    }

    useEffect(() => {

        fetchArrayOfUsers();
        fetchArrayOfNonVerifiedExperts();
        fetchArrayOfVerifiedExperts();
    }, []);

    // console.log(verifiedExperts);

    return(
        <>
        {/* Tableau simple Users */}
        <h1>All simple Users Signed up</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>full name User</TableCell>
                    <TableCell align="right">email User</TableCell>
                    <TableCell align="right">is Banned</TableCell>
                    <TableCell align="right">action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {usersArray ? (
                        <>
                        {usersArray.map((row) => (
                            <TableRow
                            key={row.userFullName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.userFullName}
                                </TableCell>

                                <TableCell align="right">{row.userEmail}</TableCell>

                                <TableCell align="right">
                                    {row.banned ? (
                                        <>
                                        BANNED
                                        </>
                                    ):(
                                        <>
                                        ACTIVE
                                        </>
                                    )} 
                                </TableCell>

                                <TableCell align="right">
                                    {row.banned ? (
                                        <Button variant="outlined" color="error" disabled={true}>
                                            Ban
                                        </Button>
                                    ):(
                                        <>
                                        <Button 
                                            variant="outlined" 
                                            color="error" 
                                            onClick={() => banSimpleUserTriggered(row.userId)}
                                        >
                                            Ban
                                        </Button>
                                        </>
                                    )} 
                                </TableCell>

                            </TableRow>
                        ))}
                        </>
                    ): (
                        <></>
                    )}
                
                </TableBody>
            </Table>
        </TableContainer>

        {/* Tableau Experts Non verifie */}
        <h1>New Experts Signed up</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>full name User</TableCell>
                    <TableCell align="right">email User</TableCell>
                    <TableCell align="right">is Banned</TableCell>
                    <TableCell align="right">action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {nonVerifiedExperts ? (
                        <>
                        {nonVerifiedExperts.map((row) => (
                            <TableRow
                            key={row.expertId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.userFullName}
                                </TableCell>

                                <TableCell align="right">{row.userEmail}</TableCell>

                                <TableCell align="right">
                                    {row.banned ? (
                                        <>
                                        BANNED
                                        </>
                                    ):(
                                        <>
                                        ACTIVE
                                        </>
                                    )} 
                                </TableCell>

                                <TableCell align="right">
                                    {row.banned ? (
                                        <Button variant="outlined" color="error" disabled={true}>
                                            Ban
                                        </Button>
                                    ):(
                                        <>
                                        <Button 
                                            variant="outlined" 
                                            color="error" 
                                            onClick={() => banExpertTroggered(row.expertId)}
                                        >
                                            Ban
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            color="success" 
                                            onClick={() => activateExpertTriggered(row.expertId)}
                                        >
                                            Activate
                                        </Button>
                                        </>
                                    )} 
                                </TableCell>

                            </TableRow>
                        ))}
                        </>
                    ):(
                        <></>
                    )}
                
                </TableBody>
            </Table>
        </TableContainer>

        {/* Tableau Experts Verifie */}
        <h1>Verified Expert</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>full name User</TableCell>
                    <TableCell align="right">email User</TableCell>
                    <TableCell align="right">is Banned</TableCell>
                    <TableCell align="right">action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {verifiedExperts ? (
                        <>
                        {verifiedExperts.map((row) => (
                            <TableRow
                            key={row.expertId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.userFullName}
                                </TableCell>

                                <TableCell align="right">{row.userEmail}</TableCell>

                                <TableCell align="right">
                                    {row.banned ? (
                                        <>
                                        BANNED
                                        </>
                                    ):(
                                        <>
                                        ACTIVE
                                        </>
                                    )} 
                                </TableCell>

                                <TableCell align="right">
                                    {row.banned ? (
                                        <Button variant="outlined" color="error" disabled={true}>
                                            Ban
                                        </Button>
                                    ):(
                                        <>
                                        <Button 
                                            variant="outlined" 
                                            color="error" 
                                            onClick={() => banExpertTroggered(row.expertId)}
                                        >
                                            Ban
                                        </Button>
                                        </>
                                    )} 
                                </TableCell>

                            </TableRow>
                        ))}
                        </>
                    ):(
                        <></>
                    )}
                
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}



export default DashboardComponent;