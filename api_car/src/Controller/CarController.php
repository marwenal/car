<?php

namespace App\Controller;

use App\Entity\Car;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CarController extends AbstractController
{
    #[Route('/api/cars/calculate-time', name: 'calculate_time', methods: ['POST'])]
    public function calculateTime(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['distance']) || !isset($data['model'])) {
            return new JsonResponse(['error' => 'Distance and Model are required'], 400);
        }

        $distance = (float) $data['distance'];
        $model = $data['model'];

        $car = $entityManager->getRepository(Car::class)->findOneBy(['model' => $model]);

        if (!$car) {
            return new JsonResponse(['error' => 'Model not found'], 404);
        }

        $kmh = $car->getKmh();

        if ($kmh <= 0) {
            return new JsonResponse(['error' => 'Invalid speed value'], 400);
        }

        $time = $distance / $kmh; // Temps en heures

        return new JsonResponse([
            'model' => $model,
            'distance' => $distance,
            'speed' => $kmh,
            'estimated_time_hours' => round($time, 2)
        ]);
    }
}
