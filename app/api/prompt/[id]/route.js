import Prompt from "../../../../models/prompt";
import connectToDB from "../../../../utils/database";

// GET (READ) only one specific prompt ================
export const GET = async (request, { params }) => {
  try {
    const { id } = await params;
    await connectToDB();
    // Find a `Prompt` by `id` and populate the `creator` field with its associated data.
    const prompt = await Prompt.findById(id).populate('creator')
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 })
  }

}
// PATCH (update) ================
export const PATCH = async (request, { params }) => {
  // Parse the incoming request body to extract the `prompt` and `tag`
  const { prompt, tag } = await request.json();
  try {
    const { id } = await params;
    await connectToDB();
    const existingPrompt = await Prompt.findById(id);
    if (!existingPrompt) return new Response("Prompt not found", { status: 404 })
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 })
  } catch (error) {

  }
}
// DELETE (delete) ================

export const DELETE = async (request, { params }) => {


  const { id } = await params;
  await connectToDB();

  // Find and delete the `Prompt` by its `id`.
  const deletedPrompt = await Prompt.findByIdAndDelete(id);

  if (!deletedPrompt)
    return new Response("Prompt not found", { status: 404 });
  return new Response("Prompt deleted successfully", { status: 200 });



}