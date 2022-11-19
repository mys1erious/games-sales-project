import { NextApiRequest, NextApiResponse } from 'next';


export default (
    _: NextApiRequest,
    res: NextApiResponse
) => {
    res.status(200).json({text: 'Hello'});
}

// Do Not Fetch an API Route from getStaticProps or getStaticPaths
// A Good Use Case: Handling Form Input
