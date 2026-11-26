<?php
/**
 * @var \CareersManager\Entity\Job $job
 * @var string                     $backUrl
 */

use CareersManager\Enum\Apply;

?>

<section class="careers-manager__job-list--detail">
    <div class="container">
        <p><a href="<?php echo $backUrl; ?>">Back to results</a></p>

        <h1><?php echo $job->getTitle(); ?></h1>

        <ul>
            <?php if ($job->getDepartment()) { ?>
                <li><?php echo $job->getDepartmentName(); ?></li>
            <?php } ?>

            <?php if ($job->getLocation()) { ?>
                <li><?php echo $job->getLocationName(); ?></li>
            <?php } ?>
        </ul>

        <?php if ($job->getDescription() !== '') { ?>
            <div><?php echo $job->getDescription(); ?></div>
        <?php } ?>

        <?php if ($job->getApplyMethod() === Apply::EMAIL) { ?>
            <a href="<?php echo t('mailto:%s', $job->getApplyEmail()); ?>" class="btn btn-primary">Apply now</a>
        <?php } else { ?>
            <a href="<?php echo $job->getApplyLink(); ?>" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Apply now</a>
        <?php } ?>
    </div>
</section>
