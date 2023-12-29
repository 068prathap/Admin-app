import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function CountCard(props) {
    return (
        <>
            <Card sx={{ m: 1 }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height={props.height}
                    image={props.image}
                />
                <CardContent sx={{display:'flex', justifyContent:'space-between', }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.value}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}
export default CountCard