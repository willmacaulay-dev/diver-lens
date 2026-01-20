import React, { useState, useMemo } from "react";
import { Card, Button, ProgressBar } from "react-bootstrap";
import computeSurvival from "../../utils/computeSurvival";


export default function AquariumSpeciesTab({
    species, onRemove, pressure, temperature, plantLife
}) {
    const [hovered, setHovered] = useState(false);

    const survival = useMemo(() => computeSurvival(species, pressure, temperature, plantLife),
        [species, pressure, temperature, plantLife]
    );

    return (
        <div
            className="mb-0"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ cursor: "pointer" }}
        >
            {!hovered && (
            <div
                className="d-flex align-items-center justify-content-between px-2 py-1 rounded"
                style={{
                    backgroundColor: "rgba(20,30,80,0.9)", color: "white", minWidth: 180
                }}
            >
                <span className="text-truncate">{species.commonName}</span>
            </div>
            )}

            {hovered && (
                <Card
                    className="shadow-sm"
                    style={{backgroundColor: "rgba(20,30,80,0.98)", color: "white"}}
                >
                    <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <Card.Title className="mb-1 fw-bold">
                                {species.commonName}
                            </Card.Title>
                            <Card.Subtitle className="mb-2">
                                <em>{species.scientificName}</em>
                            </Card.Subtitle>
                        </div>
                        <Button
                            variant="outline-light" size="sm" 
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove && onRemove(species);
                            }}
                        >
                            ×
                        </Button>
                    </div>
                    <div className="small mb-2">
                        <div>
                            { /* species depth */ }
                            <strong>Depth:</strong>{" "}
                            {species.minDepthM}–{species.maxDepthM} m (avg{" "}
                            {species.avgDepthM} m)
                        </div>
                        <div>
                            { /* species environment */ }
                            <strong>Environment:</strong> {species.environment}
                        </div>
                    </div>

                    <div className="mt-2">
                        <div className="small mb-1">
                            { /* species survival chance */ }
                            Survival chance:{" "}
                            <strong>{survival}%</strong>
                        </div>
                        <ProgressBar now={survival}
                            variant={survival > 70 ? "success" : survival > 40 ? "warning" : "danger"}
                            style={{ height: 8 }}
                        />
                    </div>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}
