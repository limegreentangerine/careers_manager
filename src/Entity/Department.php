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
 *      name="crsDepartments"
 * )
 */
class Department extends BaseEntity
{
    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     */
    protected string $name;

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
            $job->setDepartment($this);
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
            $job->setDepartment(null);
        }

        return $this;
    }
}
