import React from 'react'
import {render, cleanup} from '@testing-library/react'
import Dashboard from '../../TrackOrder';

 afterEach(cleanup)
 
 it('should take a snapshot', () => {
    const { asFragment } = render(<Dashboard />)
    
    expect(asFragment(<Dashboard />)).toMatchSnapshot()
   })