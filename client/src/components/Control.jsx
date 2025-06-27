import React from 'react';
import Upload from './Upload';
import Question from './Question';

/**
 * Control component renders a container with responsive width and vertical spacing.
 * It is designed to hold and display the <Question /> component.
 *
 * @component
 * @returns {JSX.Element} A flex container wrapping the Question component.
 */
function Control() {
  return (
    <div className="flex flex-col gap-4 w-full md:w-1/3">

      <Question />
    </div>
  );
}

export default Control;