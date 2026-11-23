<?php

namespace CareersManager\Entity;

use Doctrine\ORM\Mapping as ORM;
use ClassKit\Entity\Core\BaseEntity;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 * @ORM\Table(
 *      name="crsLocations"
 * )
 */
class Location extends BaseEntity
{
    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     */
    protected string $name;

    /**
     * @ORM\Column(type="string", length=255, unique=true, nullable=false)
     */
    protected string $handle;

    /**
     * @ORM\Column(type="boolean", nullable=false)
     */
    protected bool $isPrimary = false;

    /**
     * @var Collection<int, Job>
     * @ORM\OneToMany(targetEntity="\CareersManager\Entity\Job", mappedBy="location")
     */
    protected Collection $jobs;

    public function __construct()
    {
        $this->jobs = new ArrayCollection();
    }

    /**
     * Get the value of name
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return self
     */
    public function setName(string $name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get the value of handle
     */
    public function getHandle(): string
    {
        return $this->handle;
    }

    /**
     * Set the value of handle
     *
     * @return self
     */
    public function setHandle(string $handle)
    {
        $this->handle = $handle;

        return $this;
    }

    /**
     * Get the value of isPrimary
     */
    public function getIsPrimary(): bool
    {
        return $this->isPrimary;
    }

    /**
     * Get the value of isPrimary as string
     */
    public function getIsPrimaryString(): string
    {
        return ($this->isPrimary) ? t('Yes') : t('No');
    }

    /**
     * Set the value of isPrimary
     *
     * @return self
     */
    public function setIsPrimary(bool $isPrimary)
    {
        $this->isPrimary = $isPrimary;

        return $this;
    }

    /**
     * Get jobs
     *
     * @return Collection<int, Job>
     */
    public function getJobs()
    {
        return $this->jobs;
    }

    /**
     * Add job
     *
     * @var Job $job
     *
     * @return self
     */
    public function addJob(Job $job)
    {
        if (!$this->jobs->contains($job)) {
            $this->jobs->add($job);
        }

        return $this;
    }

    /**
     * Remove job
     *
     * @var Job $job
     *
     * @return self
     */
    public function removeJob(Job $job)
    {
        if ($this->jobs->contains($job)) {
            $this->jobs->removeElement($job);
        }

        return $this;
    }
}
