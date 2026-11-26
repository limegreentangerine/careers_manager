<?php
/**
 * @var \CareersManager\Entity\Job $job
 * @var string                     $url
 */
?>

<article class="careers-manager__job-list--result">
    <h3 class="careers-manager__job-list--result-title"><?php echo $job->getTitle(); ?></h3>
    <p class="careers-manager__job-list--result-info"><?php echo ($job->getDepartment()) ? t('%s - ', $job->getDepartmentName()) : ''; ?><?php echo ($job->getLocation()) ? $job->getLocationName() : ''; ?></p>
    <?php if ($job->getSummary() !== '') { ?>
        <div class="careers-manager__job-list--result-summary">
            <?php echo $job->getSummary(); ?>
        </div>
    <?php } ?>

    <a href="<?php echo $url; ?>" class="btn btn-primary btn-sm">Read more</a>
</article>
