import React from 'react';
import Layout from '../Layout/Layout';
import AddNotes from '../Notes/AddNotes';
import NotesContainer from '../Notes/NotesContainer';
const Notes = () => {
    return (
        <Layout>
            <h1 className='text-2xl font-semibold mb-4' style={{ color: '#8B4513' }}>Notes</h1>
            <div className='w-full flex space-x-2'>
                <NotesContainer title="test" description="hello world" />
                <AddNotes />
            </div>
        </Layout>
    );
};

export default Notes;