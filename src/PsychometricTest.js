import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Slider, FormControl, Box,Card,CardContent } from '@mui/material';

const steps = [
  'Interest Inventory',
  'Aptitude Tests',
  'Personality Assessment',
  'Cognitive Style Questionnaire',
  'Values and Motivations'
];

const InterestInventory = ({ answers, handleChange }) => {
  const questions = [
    "Exploring new technologies and gadgets.",
    "Writing essays or creating presentations on different topics.",
    // Additional questions here...
    "Engaging in outdoor activities like hiking or camping."
  ];

return (
    <FormControl component="fieldset" sx={{ width: '100%' }}>
        <Typography component="legend">Rate your interest on a scale from 1 (Not Interested) to 5 (Very Interested)</Typography>
        {questions.map((question, index) => (
            <div key={index}>
                <Typography gutterBottom>{question}</Typography>
                <Slider
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={5}
                    value={answers[index]}
                    onChange={(e, newValue) => handleChange(index, newValue)}
                />
            </div>
        ))}
    </FormControl>
);
};

// Define other section components similarly...

const getStepContent = (stepIndex, answers, handleChange) => {
  const StepComponents = {
    'Interest Inventory': InterestInventory,
    'Aptitude Tests': () => <Typography>Implement aptitude test questions here.</Typography>,
    'Personality Assessment': () => <Typography>Implement personality assessment questions here.</Typography>,
    'Cognitive Style Questionnaire': () => <Typography>Implement cognitive style questionnaire questions here.</Typography>,
    'Values and Motivations': () => <Typography>Implement values and motivations questions here.</Typography>,

    // Define other components as needed
  };

  const StepComponent = StepComponents[steps[stepIndex]];
  return <StepComponent answers={answers} handleChange={handleChange} />;
};

function PsychometricTest() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState(new Array(100).fill(1));  // Adjust according to total number of questions
  const [submitted, setSubmitted] = useState(false);
  const [scores, setScores] = useState([]);

  const handleNext = () => {
    const isLastStep = activeStep === steps.length - 1;
    if (isLastStep) {
      calculateScores();
      setSubmitted(true);
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = Number(value);
    setAnswers(newAnswers);
  };

  const calculateScores = () => {
    // Example: Divide the answers into chunks and sum each for scores
    setScores([10, 20, 30, 40, 50]); // Dummy calculation, replace with real logic
  };

  return (
    <Box sx={{ width: '100%' }}>
        <Card sx={{
                    borderColor: 'primary.main', // Set the border color
                    borderWidth: '1px',         // Set the border width
                    borderStyle: 'solid',       // Required to show the border
                    backgroundColor: '#f9f9f9', // Light gray background for contrast
                    boxShadow: 3,   
                    width: 1500,
                    marginLeft: 10,
                    
                                    // Optional: adds shadow for 3D effect
                }}>
                    <CardContent>
                
      <Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={e => e.preventDefault()}>
        <div>
          {submitted ? (
            <div>
              <Typography sx={{ mt: 2, mb: 1 }}>Test Results</Typography>
              {scores.map((score, index) => (
                <Typography key={index}>{`${steps[index]} Score: ${score}`}</Typography>
              ))}
              <Button onClick={() => setActiveStep(0)}>Reset Test</Button>
            </div>
          ) : (
            <div>
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
              {getStepContent(activeStep, answers, handleChange)}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                
                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>

              </Box>
            </div>
          )}
        </div>
      </form>
      </CardContent>
      </Card>
    </Box>
  );
}

export default PsychometricTest;
