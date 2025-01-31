<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Controller\CarController;
use App\Repository\CarRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Put;
use ApiPlatform\OpenApi\Model;
use ApiPlatform\Metadata\Delete;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CarRepository::class)]
#[ApiResource(operations: [
    new Get(),
    new GetCollection(),
    new Post(),
    new Put(),
    new Delete(),
])]
#[Post(
    uriTemplate: '/calculate-time',
    controller: CarController::class,
    openapi: new Model\Operation(
        responses: [
            new Model\Response(
                description: 'Estimated time in seconds',
                content: new \ArrayObject([
                        'application/json' => [
                            'example' => [
                                'model' => 'Tesla',
                                'distance' => 200,
                                'speed' => 120,
                                'estimated_time_hours' => 1.67,
                            ]
                        ]
                        ]
                ))
                ],
        summary: 'Calculate estimated time based on distance and car model',
        description: 'This operation calculates the estimated time based on a given distance and the car model\'s speed.',
        requestBody: new Model\RequestBody(
            content: new \ArrayObject([
                'application/json' => [
                    'schema' => [
                        'type' => 'object',
                        'properties' => [
                            'model' => ['type' => 'string'],
                            'distance' => ['type' => 'integer'],
                        ]
                    ],
                    'example' => [
                        'model' => 'Tesla',
                        'distance' => '300'
                    ]
                ]
            ])
        )
    ),
    input: null,
    name: 'calculate_time')]
#[UniqueEntity(fields: ["model"], message: "A car already exists with this model.")]
class Car
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Assert\NotBlank]
    private ?string $model = null;

    #[ORM\Column]
    #[Assert\NotBlank]
    private ?int $kmh = null;

    #[ORM\Column(nullable: true)]
    private ?array $characteristic = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getModel(): ?string
    {
        return $this->model;
    }

    public function setModel(string $model): static
    {
        $this->model = $model;

        return $this;
    }

    public function getKmh(): ?int
    {
        return $this->kmh;
    }

    public function setKmh(int $kmh): static
    {
        $this->kmh = $kmh;

        return $this;
    }

    public function getCharacteristic(): ?array
    {
        return $this->characteristic;
    }

    public function setCharacteristic(?array $characteristic): static
    {
        $this->characteristic = $characteristic;

        return $this;
    }

}
