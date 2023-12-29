import { Box, height } from "@mui/system"
import Grid from '@mui/system/Unstable_Grid';
import CountCard from '../components/countCard';
import TotalCountImage from '../assests/totalCountImage.png'
import MaleCountImage from '../assests/maleCountImage.jpg'
import FemaleCountImage from '../assests/femaleCountImage.jpg'
import Carousel from 'react-bootstrap/Carousel';
import Card from '@mui/material/Card';
import FrontendImage from '../assests/frontendImage.png'
import BackendImage from '../assests/backendImage.jpg'
import FullstackImage from '../assests/fullstackImage.png'
import HrImage from '../assests/hrImage.jpg'
import TesterImage from '../assests/testerImage.jpg'
import BusinessImage from '../assests/businessImage.jpg'

function NewHome({ totalCount, maleCount, femaleCount, jobsList }) {
    const reduceRecipes = (acc, cur, index) => {
        const groupIndex = Math.floor(index / 3);
        if (!acc[groupIndex]) acc[groupIndex] = [];
        acc[groupIndex].push(cur);
        return acc;
    };

    const images={
        'Frontend Developer':FrontendImage,
        'Backend Developer':BackendImage,
        'Fullstack Developer':FullstackImage,
        'Business Development':BusinessImage,
        'Tester':TesterImage,
        'HR':HrImage
    }

    return (
        <>
            <Box sx={{ display: { md: 'flex' } }}>
                <Box sx={{ width: {md:'200%'} }}>
                    <CountCard height={'250'} image={TotalCountImage} title={'Total Count'} value={totalCount} />
                </Box>
                <Box sx={{ width: '100%' }}>
                    <CountCard height={'250'} image={MaleCountImage} title={'Male Count'} value={maleCount} />
                </Box>
                <Box sx={{ width: '100%' }}>
                    <CountCard height={'250'} image={FemaleCountImage} title={'Female Count'} value={femaleCount} />
                </Box>
            </Box>
            <Box sx={{ p: 1, pt: 3 }}>
                <Box sx={{ fontWeight: 'bold', fontSize: 30 }}>Role List:-</Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Carousel style={{ width: '100%' }}>
                        {Object.keys(jobsList).reduce(reduceRecipes, []).map((item, index) => (
                            <Carousel.Item key={index} style={{p:5}}>
                                <div className="d-flex justify-content-center">
                                    {item.map((item, index) => {
                                        return (
                                            <Card key={index} style={{ width: '350px', boxShadow:' 0 0' }}>
                                                <CountCard height={'150'} image={images[item]} title={item} value={jobsList[item]} />
                                            </Card>
                                        );
                                    })}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Box>
            </Box>
        </>
    )
}
export default NewHome