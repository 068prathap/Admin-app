import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function CountTable(props) {
    // console.log(props);
    return (
        <>
            <TableContainer component={Paper} sx={{ border: 1, my: 2.5 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {props.heading.map((value, index) => {
                                return <TableCell align="center" key={index}>{value}</TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.body.map((row, index) => {
                            return (<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={index}>
                                {row.map((value, index) => {
                                    return <TableCell align="center" component="th" scope="row" key={index}>{value}</TableCell>
                                })}
                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default CountTable