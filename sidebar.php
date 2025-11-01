<div id="sidebar" class="col-md-4">
    <div class="search-box-container">
        <h4>Search</h4>
        <div class="input-group">
            <input type="text" id="sidebar-live-search" class="form-control" placeholder="Live search...">
            <span class="input-group-btn">
                <button type="button" id="sidebar-search-btn" class="btn btn-primary">Search</button>
            </span>
        </div>
        <small style="color: #7F8C8D; display: block; margin-top: 5px;">Type here to search for a specific post</small>
    </div>
    <div class="recent-post-container">
        <h4>Recent Posts</h4>
        <?php
        include "config.php";
        $limit = 4;

        $sql = "SELECT post.post_id, post.title, post.post_date,
        category.category_name,post.category,post.post_img FROM post
        LEFT JOIN category ON post.category = category.category_id
        ORDER BY post.post_id DESC LIMIT {$limit}";

        $result = mysqli_query($conn, $sql) or die("Query Failed. : Recent Post");
        if(mysqli_num_rows($result) > 0){
          while($row = mysqli_fetch_assoc($result)) {
      ?>
        <div class="recent-post">
            <a class="post-img" href="single.php?id=<?php echo $row['post_id']; ?>">
                <img src="admin/upload/<?php echo $row['post_img']; ?>" alt=""/>
            </a>
            <div class="post-content">
                <h5><a href="single.php?id=<?php echo $row['post_id']; ?>"><?php echo $row['title']; ?></a></h5>
                <span>
                    <i class="fa fa-tags" aria-hidden="true"></i>
                    <a href='category.php?cid=<?php echo $row['category']; ?>'><?php echo $row['category_name']; ?></a>
                </span>
                <span>
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    <?php echo $row['post_date']; ?>
                </span>
                <a class="read-more" href="single.php?id=<?php echo $row['post_id']; ?>">read more</a>
            </div>
        </div>
    <?php
      }
    }
    ?>
    </div>
</div>