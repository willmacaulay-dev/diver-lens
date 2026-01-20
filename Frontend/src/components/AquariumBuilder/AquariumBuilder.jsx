import { useNavigate } from "react-router";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useMemo } from "react";
import AquariumView from "./AquariumView";
import AquariumSidebar from "./AquariumSidebar";
import AquariumSpeciesTabs from "./AquariumSpeciesTabs";
import useAquariumStorage from "../../hooks/useAquariumStorage";
import useAquariumSettings from "../../hooks/useAquariumSettings";
import computeSurvival from "../../utils/computeSurvival";



export default function AquariumBuilder() {
    const navigate = useNavigate();

    // aquarium settings hook
    const { pressure, setPressure, temperature, setTemperature, plantLife, setPlantLife }
        = useAquariumSettings();

    const { aquariumSpecies, removeSpecies } = useAquariumStorage();

    // longevity score calculation (aggregate survival score)
    const longevity = useMemo(() => {
        if (!aquariumSpecies.length) return 0;

        const totalSurvival = aquariumSpecies.reduce(
            (sum, sp) => sum + computeSurvival(sp, pressure, temperature, plantLife), 0
        );

        const avg = totalSurvival / aquariumSpecies.length;

        return Math.round(avg);
    }, [aquariumSpecies, pressure, temperature, plantLife]);

    return (
        <Container fluid className="my-4">
            <div className="mx-auto" style={{ maxWidth: "65rem", width: "100%" }}>
                <div className="d-flex align-items-stretch mb-3">
                    <div style={{ width: 80 }}>
                        <Button variant="secondary" onClick={() => navigate("/")}>Home</Button>
                    </div>

                    <h3 className="flex-grow-1 text-center m-0 fw-bold" style={{ color: "white" }}>
                        Aquarium Builder
                    </h3>

                    <div style={{ width: 80 }} />
                </div>
                <div className="my-4">
                    <Card className="h-100 shadow-sm p-4" style={{ backgroundColor: "rgba(0, 6, 30, 0.98)", color: "white" }}>
                        <Row className="g-4">   
                            <Col xs={12} lg={8} className="d-flex flex-column gap-3">

                                { /* aquarium view */ }
                                <AquariumView plantLife={plantLife} pressure={pressure} speciesList={aquariumSpecies}/>

                                { /* species tabs */ }
                                <AquariumSpeciesTabs speciesList={aquariumSpecies} onRemove={removeSpecies} pressure={pressure}
                                    temperature={temperature} plantLife={plantLife}/>
                            </Col>

                            <Col xs={12} lg={4}>

                                { /* sidebar */ }
                                <AquariumSidebar longevity={longevity} pressure={pressure} temperature={temperature}
                                    plantLife={plantLife} onPressureChange={setPressure} onTemperatureChange={setTemperature}
                                    onPlantLifeChange={setPlantLife}/>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </Container>
    );
}