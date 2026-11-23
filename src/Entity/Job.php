<?php

namespace CareersManager\Entity;

use DateTime;
use DateTimeZone;
use CareersManager\Enum\Apply;
use CareersManager\Enum\Status;
use Doctrine\ORM\Mapping as ORM;
use ClassKit\Entity\Core\UpdatedEntity;

/**
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 * @ORM\Table(
 *      name="crsJobs",
 *      indexes={
 *          @ORM\Index(name="closingDate", columns={"closingDate"}),
 *          @ORM\Index(name="isActive", columns={"isActive"})
 *      }
 * )
 */
class Job extends UpdatedEntity
{
    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     */
    protected string $title = '';

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     */
    protected string $slug = '';

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    protected ?string $summary = null;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    protected ?string $description = null;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected ?string $department = null;

    /**
     * @ORM\ManyToOne(targetEntity="\CareersManager\Entity\Location", inversedBy="jobs")
     * @ORM\JoinColumn(name="locationId", referencedColumnName="id")
     */
    protected ?Location $location = null;

    /**
     * @ORM\Column(type="date", nullable=false)
     */
    protected DateTime $closingDate;

    /**
     * @ORM\Column(type="boolean", nullable=false)
     */
    protected bool $isActive = true;

    /**
     * email | url
     * @ORM\Column(type="string", length=10, nullable=false)
     */
    protected string $applyMethod = 'email';

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected ?string $applyEmail = null;

    /**
     * @ORM\Column(type="string", length=1024, nullable=true)
     */
    protected ?string $applyUrl = null;

    public function __get(string $method)
    {
        return $this->{'get' . ucfirst($method)}();
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle(string $title)
    {
        $this->title = trim($title);
    }

    public function getSlug()
    {
        return $this->slug;
    }

    public function setSlug(string $slug)
    {
        $this->slug = $slug;
    }

    public function getSummary()
    {
        return $this->summary;
    }

    public function setSummary(?string $summary = null)
    {
        $this->summary = $summary;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function setDescription(?string $description = null)
    {
        $this->description = $description;
    }

    public function getDepartment()
    {
        return $this->department;
    }

    public function setDepartment(?string $department = null)
    {
        $this->department = $department;
    }

    /**
     * @return DateTime|null
     */
    public function getClosingDate()
    {
        return $this->closingDate;
    }

    public function setClosingDate(DateTime $closingDate)
    {
        $this->closingDate = $closingDate;
    }

    public function isActive()
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive)
    {
        $this->isActive = $isActive;
    }

    /**
     * Has the closing date passed? A job is still open on its closing date.
     *
     * @return bool
     */
    public function isClosed()
    {
        if (!$this->closingDate) {
            return true;
        }

        return $this->closingDate->format('Y-m-d') < static::today()->format('Y-m-d');
    }

    /**
     * Should this job be visible on the frontend?
     *
     * @return bool
     */
    public function isLive()
    {
        return $this->isActive() && !$this->isClosed();
    }

    public function getStatus()
    {
        if (!$this->isActive()) {
            return Status::DRAFT;
        }

        return $this->isClosed() ? Status::CLOSED : Status::LIVE;
    }

    public function getStatusLabel()
    {
        $labels = [
            Status::LIVE => t('Live'),
            Status::CLOSED => t('Closed'),
            Status::DRAFT => t('Draft'),
        ];

        return $labels[$this->getStatus()];
    }

    public function getApplyMethod()
    {
        return $this->applyMethod;
    }

    public function setApplyMethod(string $method)
    {
        $this->applyMethod = $method === Apply::URL->value ? Apply::URL->value : Apply::EMAIL->value;
    }

    public function getApplyEmail()
    {
        return $this->applyEmail;
    }

    public function setApplyEmail(?string $email = null)
    {
        $this->applyEmail = $email;
    }

    public function getApplyUrl()
    {
        return $this->applyUrl;
    }

    public function setApplyUrl(?string $url = null)
    {
        $this->applyUrl = $url;
    }

    /**
     * The href for the "Apply now" button.
     *
     * @return string
     */
    public function getApplyLink()
    {
        if ($this->applyMethod === Apply::URL->value) {
            return $this->applyUrl;
        }

        return 'mailto:' . $this->applyEmail . '?subject=' . rawurlencode(t('Application: %s', $this->title));
    }

    /**
     * Today's date in the site's timezone.
     *
     * @return DateTime
     */
    public static function today()
    {
        return new DateTime('today', new DateTimeZone(date_default_timezone_get()));
    }

    /**
     * Get the value of location
     */
    public function getLocation(): Location
    {
        return $this->location;
    }

    /**
     * Get the value of location name
     */
    public function getLocationName(): string
    {
        return $this->location ? $this->location->getName() : '---';
    }

    /**
     * Set the value of location
     *
     * @return self
     */
    public function setLocation(Location $location)
    {
        $this->location = $location;

        return $this;
    }
}
