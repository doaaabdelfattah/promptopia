import connectToDB from '../../../../../utils/database'

import Prompt from '../../../../../models/prompt'


export const GET = async (request, { params }) => {
  try {
    const { id } = await params;
    await connectToDB();
    const prompts = await Prompt.find({ creator: id }).populate('creator')
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch all prompt", { status: 500 })
  }

}