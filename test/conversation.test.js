const { conversationHandler } = require('./../conversationHandler/conversationHandler');

// Apply a constant math random value for the purpose of this test.
const mockMath = Object.create(global.Math);
mockMath.random = () => 0;
global.Math = mockMath;

test('ensures application can locate the correct text for a simple response', () => { 
  var mockState = {
    state: {
      type: 'EXERCISE',
      data: null
    },
    routineState: {
      type: 'JOG_LIGHT', 
      data: {
        difficulty: 'LIGHT',
        activity: 'JOG', 
      }
    },
    exerciseState: {
      type: 'INTRO_JOG_LIGHT',
      data: null
    }
  }
  const output = conversationHandler({ state: mockState });
  expect(output).toEqual({
    "responseType": ":ask", 
    "text": "We are going to start by doing some heal lifts. Just tell me when you are ready."
  });
});

test('ensures application can locate the correct text for a compicated exercise response', () => { 
  var mockState = {
    state: {
      type: 'ACTIVITY',
      data: null
    },
    routineState: {
      type: 'JOG_LIGHT', 
      data: {
        difficulty: 'LIGHT',
        activity: 'JOG', 
      }
    },
    exerciseState: {
      type: 'DOUBLE_HEAL_LIFTS',
      data: null
    }
  }
  const output = conversationHandler({ state: mockState });
  expect(output).toEqual({
    "responseType": ":ask",
    "text": "With your legs inline with your hips in a standing position, slowly raise both your heals. <break time=\"1s\"/>Lastly, raise your heals one last time, and hold for one <break time=\"1s\"/> two <break time=\"1s\"/> three <break time=\"1s\"/>. Then lower them to the ground <break time=\"500ms\"/> And rest. Nice work. To continue say next or repeat to do the step again. "
  });
});