<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use League\CommonMark\CommonMarkConverter;

class ChatbotController extends Controller
{
    public function handleMessage(Request $request)
    {
        $message = $request->input('message');
        $language = $request->input('language', 'en');

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' . env('GEMINI_API_KEY'), [
            'contents' => [[
                'parts' => [[ 'text' => $message ]]
            ]]
        ]);

        $replyText = $response->json('candidates.0.content.parts.0.text') ?? "⚠️ Sorry, I couldn’t understand.";

        // Convert Markdown → HTML
        $converter = new CommonMarkConverter();
        $replyHtml = $converter->convert($replyText);

        return response()->json([
            'user_message' => $message,
            'chatbot_reply' => (string) $replyHtml, // send as HTML
            'language' => $language,
        ]);
    }
}