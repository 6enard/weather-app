<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function getWeather($city, $unit = 'metric')
    {
        $unit = in_array($unit, ['metric', 'imperial']) ? $unit : 'metric';
        $cacheKey = 'weather_' . strtolower($city) . "_$unit";

        $weatherData = \Cache::get($cacheKey);

        if (!$weatherData) {
            $client = new Client();
            $apiKey = env('OPENWEATHERMAP_API_KEY'); 

            try {
                $response = $client->get("https://api.openweathermap.org/data/2.5/weather?q={$city}&appid={$apiKey}&units={$unit}");

                $weatherData = json_decode($response->getBody()->getContents(), true);

                if ($response->getStatusCode() == 200) {
                    \Cache::put($cacheKey, $weatherData, now()->addMinutes(60));
                } else {
                    return response()->json(['error' => 'Unable to fetch weather data'], 500);
                }
            } catch (\GuzzleHttp\Exception\RequestException $e) {
                return response()->json(['error' => 'City not found or API issue'], 404);
            }
        }

        return response()->json([
            'city' => $city,
            'temperature' => $weatherData['main']['temp'],
            'description' => $weatherData['weather'][0]['description'],
            'humidity' => $weatherData['main']['humidity'],
            'wind_speed' => $weatherData['wind']['speed'],
            'icon' => $weatherData['weather'][0]['icon'],
        ]);
    }

    public function getForecast($city, $unit = 'metric')
    {
        $apiKey = env('OPENWEATHERMAP_API_KEY'); 

        $response = Http::get("https://api.openweathermap.org/data/2.5/forecast", [
            'q' => $city,
            'units' => $unit,
            'appid' => $apiKey,
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch forecast data'], 500);
        }

        $data = $response->json();

        $forecastByDay = [];

        foreach ($data['list'] as $item) {
            $date = explode(' ', $item['dt_txt'])[0];
            if (!isset($forecastByDay[$date]) && strpos($item['dt_txt'], "12:00:00") !== false) {
                $forecastByDay[$date] = $item;
            }
        }

        $dailyForecasts = [];

        foreach ($forecastByDay as $date => $forecast) {
            $dailyForecasts[] = [
                'day' => \Carbon\Carbon::parse($date)->format('D'),
                'temperature' => round($forecast['main']['temp']) . '°' . ($unit == 'metric' ? 'C' : 'F'),
                'icon' => "https://openweathermap.org/img/wn/{$forecast['weather'][0]['icon']}.png",
                'description' => $forecast['weather'][0]['description'],
            ];
        }

        return response()->json($dailyForecasts);
    }
}
