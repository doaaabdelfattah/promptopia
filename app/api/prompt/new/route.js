import connectToDB from '../../../../utils/database'

import Prompt from '../../../../models/prompt'


export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    })
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 })

  } catch (error) {
    return new Response("Failed to create new prompt", { status: 500 })
  }

}

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { userId, prompt, tag } = req.body;
//     try {
//       await connectToDB();
//       const newPrompt = new Prompt({
//         creator: userId,
//         prompt,
//         tag,
//       });
//       await newPrompt.save();
//       res.status(201).json(newPrompt);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to create new prompt' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }